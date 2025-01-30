import { InvoiceItemStatus, InvoiceStatusLog } from '@/app/lib/definitions';
import { formatDateToLocal, formatTimestampToLocal } from '@/app/lib/utils';
import { invoiceStatusMap } from './utils';
import StatusPill from './status-pill';

export default function InvoiceStatusLogs({
  logs,
}: {
  logs: InvoiceStatusLog[];
}) {
  const renderStatusPills = (
    oldStatus: InvoiceItemStatus,
    newStatus: InvoiceItemStatus
  ) => {
    const mappedOldStatus = invoiceStatusMap[oldStatus];
    const mappedNewStatus = invoiceStatusMap[newStatus];

    return (
      <div className="flex items-center gap-1">
        <StatusPill
          label={mappedOldStatus.label}
          value={mappedOldStatus.value}
          badgeStyles={mappedOldStatus.badgeStyles}
          Icon={mappedOldStatus.icon}
        />
        →
        <StatusPill
          label={mappedNewStatus.label}
          value={mappedNewStatus.value}
          badgeStyles={mappedNewStatus.badgeStyles}
          Icon={mappedNewStatus.icon}
        />
      </div>
    );
  };
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  User Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {logs?.map((log) => (
                <tr
                  key={log.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{log.user_email}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTimestampToLocal(log.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {renderStatusPills(
                      log.invoice_old_status,
                      log.invoice_new_status
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
