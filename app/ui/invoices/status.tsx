import clsx from 'clsx';
import { invoiceStatusMap } from './utils';

import { InvoiceItemStatus } from '@/app/lib/definitions';

export default function InvoiceStatus({
  status,
}: {
  status: InvoiceItemStatus;
}) {
  const currentStatus = invoiceStatusMap[status];

  const StatusIcon = currentStatus.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        currentStatus.badgeStyles
      )}
    >
      {currentStatus.label}
      <StatusIcon
        className={`ml-1 w-4 text-gray-500 ${currentStatus.iconColor}`}
      />
    </span>
  );
}
