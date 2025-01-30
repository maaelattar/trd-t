'use client';
import { updateInvoiceStatusAndLogs } from '@/app/lib/actions';
import clsx from 'clsx';
import { useTransition } from 'react';

export default function InvoiceStatusLogRestore({
  invoiceId,
  oldStatus,
  newStatus,
}: {
  invoiceId: string;
  oldStatus: string;
  newStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleRestoreStatus = () => {
    startTransition(() => {
      updateInvoiceStatusAndLogs(invoiceId, newStatus, oldStatus, 'restored');
    });
  };

  return (
    <button
      className={clsx(
        'text-blue-500 hover:text-blue-700',
        isPending && 'opacity-50 cursor-not-allowed'
      )}
      onClick={() => {
        handleRestoreStatus();
      }}
    >
      Restore
    </button>
  );
}
