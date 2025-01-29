import { db, VercelPoolClient } from "@vercel/postgres";
import { NextResponse } from "next/server";

export default async function runMigration(
  name: string,
  migration: (client: VercelPoolClient) => Promise<void>
) {
  try {
    const client = await db.connect();
    await migration(client);

    client.release();
    return NextResponse.json({ message: `Migration ${name} ran successfully` });
  } catch (error) {
    return NextResponse.json({ error: `Migration ${name} ${error}` });
  }
}
