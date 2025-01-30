'use client';

import { InvoiceItemStatus } from '@/app/lib/definitions';
import { getInvoiceStatuses, invoiceStatusMap } from './utils';
import StatusPill from './status-pill';
import { ChangeEvent, useEffect, useState } from 'react';

export default function InvoiceFormStatusInputs({
  dueDate,
  status,
  statusErrors,
}: {
  dueDate?: string;
  status?: InvoiceItemStatus;
  statusErrors?: string[];
}) {
  const [currentStatus, setCurrentStatus] = useState<InvoiceItemStatus>();

  useEffect(() => {
    if (status) {
      setCurrentStatus(status);
    }
  }, [status]);

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(e.target.value as InvoiceItemStatus);
  };

  const statuses = getInvoiceStatuses(dueDate);

  const renderStatuses = () => {
    return statuses.map((statusItem) => {
      const mappedStatus = invoiceStatusMap[statusItem];
      return (
        <StatusPill
          key={mappedStatus.label}
          label={mappedStatus.label}
          value={mappedStatus.value}
          badgeStyles={mappedStatus.badgeStyles}
          currentInputStatus={currentStatus}
          onChange={onStatusChange}
          Icon={mappedStatus.icon}
        />
      );
    });
  };

  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium">
        Set the invoice status
      </legend>
      <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
        <div className="flex gap-4">{renderStatuses()}</div>
      </div>
      <div id="status-error" aria-live="polite" aria-atomic="true">
        {statusErrors &&
          statusErrors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </fieldset>
  );
}
