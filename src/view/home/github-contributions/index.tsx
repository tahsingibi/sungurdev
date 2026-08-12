import { Suspense } from "react";

import {
    GitHubContributions,
    GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import settings from "@/lib/settings";
const GITHUB_USERNAME = settings.github as string;
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export default function HomeGitHubContributions() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <div className="p-6">
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 shadow-soft">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
          />
        </Suspense>
      </div>
    </div>
  );
}
