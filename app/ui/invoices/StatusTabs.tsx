'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const tabs = [
  {
    label: 'All',
    statusQuery: null,
  },
  {
    label: 'Paid',
    statusQuery: 'paid',
  },
  {
    label: 'Overdue',
    statusQuery: 'overdue',
  },
  {
    label: 'Pending',
    statusQuery: 'pending',
  },
  {
    label: 'Canceled',
    statusQuery: 'canceled',
  },
];

export default function StatusTabs() {
  const searchParams = useSearchParams();

  const renderTabs = () => {
    return tabs.map((tab) => {
      const urlParams = new URLSearchParams();
      if (tab.statusQuery) {
        urlParams.set('status', tab.statusQuery);
      }

      urlParams.set('page', '1');

      const isActive = searchParams.get('status') === tab.statusQuery;
      return (
        <li key={tab.label} className="me-2">
          <Link
            href={`/dashboard/invoices/?${urlParams.toString()}`}
            className={clsx(
              'inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300',
              isActive
                ? 'text-blue-600 border-b-2 border-blue-600  active'
                : 'border-transparent'
            )}
            aria-current={isActive && 'page'}
          >
            {tab.label}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">{renderTabs()}</ul>
    </div>
  );
}
