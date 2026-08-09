import type { Metadata } from "next";
import settings from "@/lib/settings";
import WorksView from "@/view/works";

export const metadata: Metadata = {
  title: settings.pages.works.heading,
  description: settings.pages.works.description,
  alternates: {
    canonical: settings.pages.works.path,
  },
};

export default function Page() {
  return <WorksView />;
}
