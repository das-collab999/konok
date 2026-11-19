-- Конок — структура базы данных (шаг 3 техзадания).
--
-- Как применить: Supabase → SQL Editor → вставить этот файл целиком → Run.
-- Потом так же выполнить supabase/seed.sql — он зальёт тестовые данные.
--
-- Правила доступа (RLS) настроены так:
--   • гость без входа видит только опубликованные места и может создать бронь;
--   • хозяин видит и правит только свои места и свои брони;
--   • админ видит всё.

create extension if not exists "pgcrypto";

-- ───────────────────────────────────────────── справочники

create type place_type   as enum ('yurt', 'house');
create type region_key   as enum ('issyk', 'naryn', 'chui', 'jalal', 'osh', 'talas', 'batken');
create type car_access   as enum ('car', '4x4');
create type extra_per    as enum ('trip', 'guest');
create type booking_state as enum ('pending', 'confirmed', 'declined', 'cancelled', 'completed');
create type pay_state    as enum ('unpaid', 'paid', 'refunded');
create type meal_kind    as enum ('breakfast', 'dinner', 'snack', 'drink');
create type transport_mode as enum ('transfer', 'marshrutka', 'taxi', 'car', 'horse', 'flight');
create type contact_scope as enum ('national', 'region', 'place');

-- ───────────────────────────────────────────── люди

create table admins (
  user_id uuid primary key references auth.users on delete cascade,
  note    text,
  created_at timestamptz not null default now()
);

create table hosts (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid unique references auth.users on delete set null,
  family_name      text not null,
  phone            text,
  telegram_chat_id text,
  payout_method    text,
  payout_details   text,
  language         text not null default 'ky',
  created_at       timestamptz not null default now()
);

-- ───────────────────────────────────────────── места

create table places (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,
  host_id               uuid references hosts on delete set null,
  type                  place_type not null,
  region                region_key not null,
  place_name            text not null,              -- «Сон-Куль, Нарын»
  title                 text not null,
  short                 text not null,
  host_story            text,
  road_description      text,
  lat                   double precision,
  lng                   double precision,
  altitude_m            int,
  price_per_person_usd  numeric(10,2) not null,
  capacity              int not null default 8,
  meals_included        boolean not null default true,
  has_stove             boolean not null default false,
  has_bath              boolean not null default false,
  has_signal            boolean not null default false,
  car_access            car_access not null default 'car',
  toilet                text,
  wash                  text,
  net                   text,
  road_type             text,
  sleeping              text,
  season_from           int check (season_from between 1 and 12),
  season_to             int check (season_to between 1 and 12),
  verified              boolean not null default false,
  published             boolean not null default false,
  created_at            timestamptz not null default now()
);

create index places_region_idx on places (region) where published;

create table place_photos (
  id       uuid primary key default gen_random_uuid(),
  place_id uuid not null references places on delete cascade,
  url      text not null,
  alt      text,
  sort     int not null default 0
);

create table place_translations (
  place_id         uuid not null references places on delete cascade,
  lang             text not null,                   -- ru | en | zh | ky
  title            text,
  short            text,
  host_story       text,
  road_description text,
  primary key (place_id, lang)
);

create table extras (
  id        uuid primary key default gen_random_uuid(),
  place_id  uuid references places on delete cascade, -- null = услуга для всех мест
  slug      text not null,
  title     text not null,
  price_usd numeric(10,2) not null,
  per       extra_per not null default 'guest',
  sort      int not null default 0
);

create table availability (
  place_id   uuid not null references places on delete cascade,
  date       date not null,
  spots_left int  not null default 0,
  primary key (place_id, date)
);

-- ─────────────────────────── что поесть, на чём доехать, куда звонить

create table meals (
  id          uuid primary key default gen_random_uuid(),
  place_id    uuid references places on delete cascade, -- null = общее блюдо кухни
  kind        meal_kind not null,
  title       text not null,
  description text,
  price_usd   numeric(10,2),
  vegetarian  boolean not null default false,
  halal       boolean not null default true,
  sort        int not null default 0
);

create table transport_options (
  id           uuid primary key default gen_random_uuid(),
  place_id     uuid references places on delete cascade,
  mode         transport_mode not null,
  title        text not null,
  description  text,
  price_usd    numeric(10,2),
  duration_min int,
  sort         int not null default 0
);

create table contacts (
  id       uuid primary key default gen_random_uuid(),
  scope    contact_scope not null,
  region   region_key,
  place_id uuid references places on delete cascade,
  title    text not null,
  phone    text not null,
  note     text,
  sort     int not null default 0
);

-- ───────────────────────────────────────────── брони и отзывы

create table bookings (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,
  place_id       uuid not null references places on delete restrict,
  guest_name     text not null,
  guest_phone    text not null,
  guest_email    text,
  check_in       date not null,
  nights         int  not null check (nights between 1 and 30),
  guests         int  not null check (guests between 1 and 20),
  extras         jsonb not null default '[]'::jsonb,
  total_usd      numeric(10,2) not null,
  commission_usd numeric(10,2) not null default 0,
  status         booking_state not null default 'pending',
  payment_status pay_state not null default 'unpaid',
  note           text,
  created_at     timestamptz not null default now()
);

create index bookings_place_idx on bookings (place_id, check_in);

create table reviews (
  id         uuid primary key default gen_random_uuid(),
  booking_id uuid unique not null references bookings on delete cascade,
  rating     int not null check (rating between 1 and 5),
  text       text,
  lang       text not null default 'ru',
  published  boolean not null default false,
  created_at timestamptz not null default now()
);

-- ───────────────────────────────────────────── вспомогательные функции

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

create or replace function owns_place(p uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from places pl
    join hosts h on h.id = pl.host_id
    where pl.id = p and h.user_id = auth.uid()
  );
$$;

-- Номер брони: KNK-XXXXX
create or replace function next_booking_code() returns text
language sql volatile as $$
  select 'KNK-' || lpad((floor(random() * 90000) + 10000)::text, 5, '0');
$$;

-- Поиск своей брони без регистрации: по номеру и телефону.
create or replace function find_booking(p_code text, p_phone text)
returns table (
  code text, title text, place_name text, host_family text,
  check_in date, nights int, guests int, total_usd numeric, status booking_state
)
language sql stable security definer set search_path = public as $$
  select b.code, pl.title, pl.place_name, h.family_name,
         b.check_in, b.nights, b.guests, b.total_usd, b.status
  from bookings b
  join places pl on pl.id = b.place_id
  left join hosts h on h.id = pl.host_id
  where b.code = upper(trim(p_code))
    and regexp_replace(b.guest_phone, '\D', '', 'g') = regexp_replace(p_phone, '\D', '', 'g');
$$;

-- ───────────────────────────────────────────── права доступа

alter table admins             enable row level security;
alter table hosts              enable row level security;
alter table places             enable row level security;
alter table place_photos       enable row level security;
alter table place_translations enable row level security;
alter table extras             enable row level security;
alter table availability       enable row level security;
alter table meals              enable row level security;
alter table transport_options  enable row level security;
alter table contacts           enable row level security;
alter table bookings           enable row level security;
alter table reviews            enable row level security;

-- Гость: читает опубликованное
create policy read_published_places on places for select using (published or is_admin() or owns_place(id));
create policy read_photos      on place_photos       for select using (exists (select 1 from places p where p.id = place_id and p.published) or is_admin());
create policy read_translations on place_translations for select using (exists (select 1 from places p where p.id = place_id and p.published) or is_admin());
create policy read_extras      on extras             for select using (place_id is null or exists (select 1 from places p where p.id = place_id and p.published) or is_admin());
create policy read_availability on availability      for select using (exists (select 1 from places p where p.id = place_id and p.published) or is_admin());
create policy read_meals       on meals              for select using (place_id is null or exists (select 1 from places p where p.id = place_id and p.published) or is_admin());
create policy read_transport   on transport_options  for select using (place_id is null or exists (select 1 from places p where p.id = place_id and p.published) or is_admin());
create policy read_contacts    on contacts           for select using (true);
create policy read_reviews     on reviews            for select using (published or is_admin());
create policy read_hosts       on hosts              for select using (true);

-- Гость: создаёт бронь (читать чужие брони нельзя — только через find_booking)
create policy create_booking on bookings for insert with check (true);
create policy read_own_bookings on bookings for select
  using (is_admin() or owns_place(place_id));

-- Хозяин: правит свои места и свои брони
create policy host_updates_place on places for update
  using (owns_place(id)) with check (owns_place(id));
create policy host_updates_booking on bookings for update
  using (owns_place(place_id) or is_admin()) with check (owns_place(place_id) or is_admin());
create policy host_updates_self on hosts for update
  using (user_id = auth.uid() or is_admin()) with check (user_id = auth.uid() or is_admin());
create policy host_manages_availability on availability for all
  using (owns_place(place_id) or is_admin()) with check (owns_place(place_id) or is_admin());
create policy host_manages_photos on place_photos for all
  using (owns_place(place_id) or is_admin()) with check (owns_place(place_id) or is_admin());

-- Админ: всё остальное
create policy admin_all_places    on places    for all using (is_admin()) with check (is_admin());
create policy admin_all_hosts     on hosts     for all using (is_admin()) with check (is_admin());
create policy admin_all_extras    on extras    for all using (is_admin()) with check (is_admin());
create policy admin_all_meals     on meals     for all using (is_admin()) with check (is_admin());
create policy admin_all_transport on transport_options for all using (is_admin()) with check (is_admin());
create policy admin_all_contacts  on contacts  for all using (is_admin()) with check (is_admin());
create policy admin_reads_admins  on admins    for select using (is_admin());
