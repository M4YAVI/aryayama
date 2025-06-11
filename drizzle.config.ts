import 'dotenv/config'; // Use ES module import style
import type { Config } from 'drizzle-kit';

// This check ensures that the environment variables are loaded.
// If they are not, it will throw an error with a helpful message
// instead of letting the app crash with a vague 'undefined' error.
if (!process.env.TURSO_DATABASE_URL) {
  throw new Error('TURSO_DATABASE_URL environment variable is not set');
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_AUTH_TOKEN environment variable is not set');
}

export default {
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    // We can now safely use the variables because we've checked them above.
    // The '!' is still okay here because the checks guarantee they exist.
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;

// REMOVED: You do not need to create a client here.
// Drizzle Kit reads the `dbCredentials` object and creates its own client internally.
/*
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
*/
