import runMigration from '../runMigration';

export async function GET() {
  return runMigration('003-add-invoice-status-logs-table', async (client) => {
    await client.sql`CREATE TABLE IF NOT EXISTS invoice_status_logs
    (
    id UUID DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    invoice_old_status VARCHAR(255) NOT NULL,
    invoice_new_status VARCHAR(255) NOT NULL,
    log_status VARCHAR(255) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoice_id FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
  )
`;

    await client.sql`CREATE INDEX idx_invoice_status_logs_invoice_id ON invoices(id)`;
  });
}

// TODO
// REMOVE
