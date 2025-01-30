import { InvoiceItemStatus } from '@/app/lib/definitions';
import { getInvoiceStatuses, invoiceStatusMap } from './utils';
import clsx from 'clsx';

export default function InvoiceFormStatusInputs({
  dueDate,
  status,
  statusErrors,
}: {
  dueDate?: string;
  status?: InvoiceItemStatus;
  statusErrors?: string[];
}) {
  const statuses = getInvoiceStatuses(dueDate);

  const renderStatuses = () => {
    return statuses.map((statusItem) => {
      const mappedStatus = invoiceStatusMap[statusItem];
      const Icon = mappedStatus.icon;
      return (
        <div className="flex items-center" key={mappedStatus.label}>
          <input
            id={mappedStatus.value}
            name="status"
            type="radio"
            value={mappedStatus.value}
            defaultChecked={status === mappedStatus.value}
            className={clsx(
              'h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
            )}
          />
          <label
            htmlFor={mappedStatus.value}
            className={clsx(
              'ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium',
              mappedStatus.badgeStyles
            )}
          >
            {mappedStatus.label} <Icon className="h-4 w-4" />
          </label>
        </div>
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
