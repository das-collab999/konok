import { notFound } from "next/navigation";
import { STORIES, getStory } from "@/data/stories";
import { StoryView } from "./StoryView";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getStory((await params).slug);
  return s ? { title: `${s.title.ru} — Конок`, description: s.lead.ru } : { title: "Конок" };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  return <StoryView story={story} />;
}
