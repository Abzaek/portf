/**
 * Server component that fetches live GitHub star + fork counts for each
 * repo and renders the (client) OSSSection with the fresh data.
 *
 * Caching: Next.js's `fetch` with `next: { revalidate }` is shared across
 * all requests to this URL, so even at significant traffic we only hit
 * the GitHub API ~9 times per revalidation window (one per repo). With
 * REVALIDATE_SEC = 21600 (6 hours) that's well under the 60 req/hr
 * unauthenticated rate limit even on a cold start.
 *
 * Failure handling: if a single repo's request fails (rate limit, GitHub
 * outage, network blip), that repo's counts fall back to "—" and the rest
 * of the section still renders.
 */

import { OSSSection, type Language, type OSSRepo } from "./oss-section";

interface RepoMetadata {
  id: string;
  name: string;
  org: string;
  language: Language;
  note: string;
}

/** Static per-repo metadata. Stars + forks are pulled live from GitHub. */
const REPOS_META: RepoMetadata[] = [
  {
    id: "0xOS_01",
    name: "buildkit",
    org: "moby",
    language: "Go",
    note: "Concurrent, cache-efficient image builder. Moby's container build engine.",
  },
  {
    id: "0xOS_02",
    name: "listmonk",
    org: "knadh",
    language: "Go",
    note: "Self-hosted, high-performance newsletter and mailing-list manager.",
  },
  {
    id: "0xOS_03",
    name: "atlantis",
    org: "runatlantis",
    language: "Go",
    note: "Terraform PR automation. Run terraform plan/apply via pull requests.",
  },
  {
    id: "0xOS_04",
    name: "watermill",
    org: "ThreeDotsLabs",
    language: "Go",
    note: "Event-driven applications library with pluggable Pub/Sub backends.",
  },
  {
    id: "0xOS_05",
    name: "bbolt",
    org: "etcd-io",
    language: "Go",
    note: "Embedded key/value store. The storage engine behind etcd.",
  },
  {
    id: "0xOS_06",
    name: "go-swagger",
    org: "go-swagger",
    language: "Go",
    note: "OpenAPI 2.0 toolchain. Generate clients, servers, and docs from specs.",
  },
  {
    id: "0xOS_07",
    name: "terragrunt",
    org: "gruntwork-io",
    language: "Go",
    note: "Thin Terraform wrapper. DRY infrastructure code across environments.",
  },
  {
    id: "0xOS_08",
    name: "git-bug",
    org: "git-bug",
    language: "Go",
    note: "Distributed, offline-first bug tracker embedded in Git.",
  },
  {
    id: "0xOS_09",
    name: "paramiko",
    org: "paramiko",
    language: "Python",
    note: "Pure-Python SSHv2 implementation. The backbone of Python SSH tooling.",
  },
];

const REVALIDATE_SEC = 60 * 60 * 6; // 6 hours
const FALLBACK = "—";

interface RepoCounts {
  stars: number;
  forks: number;
}

async function fetchRepoCounts(
  org: string,
  name: string,
): Promise<RepoCounts | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${org}/${name}`, {
      next: { revalidate: REVALIDATE_SEC },
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        // If GITHUB_TOKEN is set we use it (5000/hr instead of 60/hr).
        // Optional — the public endpoint works without it.
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      stargazers_count?: number;
      forks_count?: number;
    };
    if (
      typeof data.stargazers_count !== "number" ||
      typeof data.forks_count !== "number"
    ) {
      return null;
    }
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
    };
  } catch {
    return null;
  }
}

/**
 * Format a raw integer star/fork count to a compact display string.
 *   731       -> "731"
 *   1400      -> "1.4k"
 *   9842      -> "9.8k"
 *   20800     -> "20.8k"
 *   10000     -> "10k"   (drop trailing .0)
 *   108000    -> "108k"
 */
function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 100_000) {
    const tenths = Math.round(n / 100) / 10;
    return (Number.isInteger(tenths) ? tenths.toString() : tenths.toFixed(1)) + "k";
  }
  return Math.round(n / 1000) + "k";
}

/** "108k+" for the footer rail summing across all repos. */
function formatTotal(total: number): string {
  if (total < 1000) return String(total);
  if (total < 100_000) {
    return Math.round(total / 1000) + "k+";
  }
  return Math.round(total / 1000) + "k+";
}

export async function OSSSectionLive() {
  // Fire all requests in parallel. Next.js dedupes + caches per URL.
  const countsList = await Promise.all(
    REPOS_META.map((r) => fetchRepoCounts(r.org, r.name)),
  );

  const repos: OSSRepo[] = REPOS_META.map((meta, i) => {
    const counts = countsList[i];
    return {
      ...meta,
      url: `https://github.com/${meta.org}/${meta.name}`,
      stars: counts ? formatCount(counts.stars) : FALLBACK,
      forks: counts ? formatCount(counts.forks) : FALLBACK,
    };
  });

  const totalStarsRaw = countsList.reduce(
    (sum, c) => (c ? sum + c.stars : sum),
    0,
  );
  const totalStars = totalStarsRaw > 0 ? formatTotal(totalStarsRaw) : FALLBACK;

  return <OSSSection repos={repos} totalStars={totalStars} />;
}
