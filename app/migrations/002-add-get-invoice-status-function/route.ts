// import runMigration from "../runMigration";

// export async function GET() {
//   return runMigration("002-add-get-invoice-status-function", async (client) => {
//     await client.sql`CREATE OR REPLACE FUNCTION get_invoice_status(status VARCHAR, due_date DATE)
//         RETURNS VARCHAR AS $$
//         SELECT CASE WHEN status = 'pending' AND due_date < CURRENT_DATE THEN 'overdue'
//         ELSE status
//         END
//         $$ LANGUAGE SQL STABLE;
//         `;
//   });
// }

// TODO
// DELETE
