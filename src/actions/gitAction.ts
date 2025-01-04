// app/actions/github.ts
'use server';

import { z } from 'zod';

const ContributionSchema = z.object({
  date: z.string(),
  count: z.number(),
});

const UserDataSchema = z.object({
  contributions: z.array(ContributionSchema),
  totalStars: z.number(),
  publicRepos: z.number(),
});

export type UserData = z.infer<typeof UserDataSchema>;

// Helper function to format date as ISO string
function formatDateISO(date: Date): string {
  return date.toISOString();
}

export async function fetchGitHubData(username: string): Promise<UserData> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GitHub access token is not configured');
  }

  try {
    // Get the date range for the current year
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endDate = formatDateISO(now);
    const startDate = formatDateISO(startOfYear);

    // GraphQL query to get contributions
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositories(first: 100, privacy: PUBLIC) {
            nodes {
              stargazerCount
            }
          }
        }
      }
    `;

    // Fetch data from GitHub GraphQL API
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: startDate,
          to: endDate,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub API Errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    // Transform the data
    const contributions =
      data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week: any) =>
          week.contributionDays.map((day: any) => ({
            date: day.date,
            count: day.contributionCount,
          }))
      );

    const totalStars = data.data.user.repositories.nodes.reduce(
      (sum: number, repo: any) => sum + repo.stargazerCount,
      0
    );

    const userData = {
      contributions,
      totalStars,
      publicRepos: data.data.user.repositories.nodes.length,
    };

    // Validate the data
    const parsedData = UserDataSchema.parse(userData);
    return parsedData;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred');
  }
}
