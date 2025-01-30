import { InvoiceItemStatus } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export const invoiceStatusMap = {
  pending: {
    value: "pending",
    label: "Pending",
    icon: ClockIcon,
    badgeStyles: "bg-gray-100 text-gray-600",
    iconColor: "text-gray-600",
  },
  paid: {
    value: "paid",
    label: "Paid",
    icon: CheckIcon,
    badgeStyles: "bg-green-100 text-green-600",
    iconColor: "text-green-600",
  },
  overdue: {
    value: "overdue",
    label: "Overdue",
    icon: ExclamationCircleIcon,
    badgeStyles: "bg-amber-100 text-amber-600",
    iconColor: "text-amber-600",
  },
};

export const getIsInvoiceStatusPending = (dueDate?: string) => {
  if (!dueDate) return true;
  return new Date(dueDate) > new Date();
};

export const getPendingOrOverdueStatus = (dueDate?: string) => {
  return getIsInvoiceStatusPending(dueDate) ? "pending" : "overdue";
};
export const getInvoiceStatuses = (dueDate?: string): InvoiceItemStatus[] => {
  return [getPendingOrOverdueStatus(dueDate), "paid"];
};
