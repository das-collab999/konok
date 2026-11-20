import { GuideClient } from "./GuideClient";

export const metadata = {
  title: "Путеводитель по Кыргызстану — Конок",
  description: "Что едят, как доехать, какие условия в юртах, что взять с собой, как вести себя в гостях и куда звонить в беде.",
};

export default function GuidePage() {
  return <GuideClient />;
}
