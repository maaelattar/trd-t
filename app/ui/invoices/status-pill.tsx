import { InvoiceItemStatus } from '@/app/lib/definitions';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

export default function StatusPill({
  onChange,
  currentInputStatus,
  value,
  Icon,
  badgeStyles,
  label,
}: {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  currentInputStatus?: InvoiceItemStatus;
  value: string;
  Icon: React.ElementType;
  badgeStyles?: string;
  label: string;
}) {
  return (
    <div className="flex items-center">
      {onChange && (
        <input
          id={value}
          name="status"
          type="radio"
          value={value}
          checked={currentInputStatus === value}
          onChange={onChange}
          className={clsx(
            'h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
          )}
        />
      )}
      <label
        htmlFor={value}
        className={clsx(
          'ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium',
          badgeStyles
        )}
      >
        {label} <Icon className="h-4 w-4" />
      </label>
    </div>
  );
}
