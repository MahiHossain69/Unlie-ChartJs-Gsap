'use client';

import { useState } from 'react';
import AccountCard from '@/components/screens/myAcc/AccountCard';


interface Account {
  id: string;
  name: string;
  avatar: string;
  criticalThreats: number;
  otherThreats: number;
  elementsToReview: number;
  newInsights: number;
}

export default function AccountsList() {
  const [accounts] = useState<Account[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: "/john.svg",
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '2',
      name: 'Albert Flores',
      avatar: '/albert.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '3',
      name: 'Kristin Watson',
      avatar: '/kristin.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '4',
      name: 'Ralph Edwards',
      avatar: '/ralph.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '5',
      name: 'Esther Howard',
      avatar: '/esther.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '6',
      name: 'Darlene Robertson',
      avatar: '/darlene.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '7',
      name: 'Cody Fisher',
      avatar: 'cody.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
    {
      id: '8',
      name: 'Robert Fox',
      avatar: '/robert.svg',
      criticalThreats: 5,
      otherThreats: 8,
      elementsToReview: 2,
      newInsights: 3,
    },
  ]);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">My Accounts</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}