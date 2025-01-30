import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceByIdWithLogs } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import InvoiceStatusLogs from '@/app/ui/invoices/invoice-status-logs';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [{ invoice, statusLogs }, customers] = await Promise.all([
    fetchInvoiceByIdWithLogs(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-base">Status Logs</p>
        <InvoiceStatusLogs logs={statusLogs} />
      </div>
    </main>
  );
}
