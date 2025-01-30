'use client';

import clsx from 'clsx';
import { getInvoiceStatuses, invoiceStatusMap } from './utils';

import { InvoiceItemStatus } from '@/app/lib/definitions';
import { useState, useTransition } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { updateInvoiceStatusAndLogs } from '@/app/lib/actions';

export default function InvoiceStatus({
  invoiceId,
  status,
  dueDate,
}: {
  invoiceId: string;
  status: InvoiceItemStatus;
  dueDate: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const currentStatus = invoiceStatusMap[status];

  const StatusIcon = currentStatus.icon;

  const statuses = getInvoiceStatuses(dueDate, status);

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    startTransition(() => {
      updateInvoiceStatusAndLogs(invoiceId, currentStatus.value, newStatus);
      setIsOpen(false);
    });
  };

  const renderStatuses = () => {
    return statuses.map((statusItem) => {
      const mappedStatus = invoiceStatusMap[statusItem];
      const Icon = mappedStatus.icon;
      return (
        <div
          key={statusItem}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          className={clsx(
            'p-2 hover:opacity-70 rounded-md cursor-pointer inline-flex items-center text-xs gap-1',
            mappedStatus.badgeStyles
          )}
          onClick={() => {
            handleStatusChange(invoiceId, mappedStatus.value);
          }}
        >
          <Icon className={`w-4 ${mappedStatus.iconColor}`} />
          {mappedStatus.label}
        </div>
      );
    });
  };
  return (
    <div className="relative">
      <span
        className={clsx(
          'inline-flex items-center rounded-full px-2 py-1 text-xs gap-1 cursor-pointer',
          currentStatus.badgeStyles
        )}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        <StatusIcon className={`w-4 ${currentStatus.iconColor}`} />

        {currentStatus.label}
        <ChevronDownIcon
          className={clsx(
            `w-3  ${currentStatus.iconColor}`,
            isOpen && 'rotate-180'
          )}
        />
      </span>

      {isOpen && (
        <div
          className={clsx(
            'absolute top-8 right-0 z-10 bg-white shadow-lg rounded-lg p-2 w-40 flex flex-col gap-2',
            isPending && 'opacity-85'
          )}
        >
          {renderStatuses()}
        </div>
      )}
    </div>
  );
}
