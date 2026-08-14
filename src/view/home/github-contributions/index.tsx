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
    <div className="px-6 pb-6">
      <Suspense fallback={<GitHubContributionsFallback />}>
        <GitHubContributions
          contributions={contributions}
          githubProfileUrl={GITHUB_PROFILE_URL}
        />
      </Suspense>
    </div>
  );
}
