// import runMigration from "../runMigration";

// export async function GET() {
//   return runMigration("001-add-due-date-to-invoices", async (client) => {
//     await client.sql`ALTER TABLE invoices ADD COLUMN due_date DATE`;

//     await client.sql`UPDATE invoices SET due_date = date + INTERVAL '14 days'`;
//   });
// }

// TODO
// DELETE
