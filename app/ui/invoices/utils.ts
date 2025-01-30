import { InvoiceItemStatus } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export const invoiceStatusMap = {
  pending: {
    value: 'pending',
    label: 'Pending',
    icon: ClockIcon,
    badgeStyles: 'bg-gray-100 text-gray-600',
    iconColor: 'text-gray-600',
  },
  paid: {
    value: 'paid',
    label: 'Paid',
    icon: CheckIcon,
    badgeStyles: 'bg-green-100 text-green-600',
    iconColor: 'text-green-600',
  },
  overdue: {
    value: 'overdue',
    label: 'Overdue',
    icon: ExclamationCircleIcon,
    badgeStyles: 'bg-amber-100 text-amber-600',
    iconColor: 'text-amber-600',
  },
  canceled: {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircleIcon,
    badgeStyles: 'bg-red-100 text-red-600',
    iconColor: 'text-red-600',
  },
};

export const getIsInvoiceStatusPending = (dueDate?: string) => {
  if (!dueDate) return true;
  return new Date(dueDate) > new Date();
};

export const getPendingOrOverdueStatus = (dueDate?: string) => {
  return getIsInvoiceStatusPending(dueDate) ? 'pending' : 'overdue';
};
export const getInvoiceStatuses = (
  dueDate?: string,
  status?: InvoiceItemStatus
): InvoiceItemStatus[] => {
  return [getPendingOrOverdueStatus(dueDate), 'canceled', 'paid'].filter(
    (item) => item !== status
  ) as InvoiceItemStatus[];
};
