'use client';

import {
  Info,
  Eye,
  X
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';

interface AccountCardProps {
  account?: {
    id: string;
    name: string;
    avatar: string;
    criticalThreats: number;
    otherThreats: number;
    elementsToReview: number;
    newInsights: number;
  };
}

export default function AccountCard({ account }: AccountCardProps) {
  // ✅ Hooks must be declared unconditionally, BEFORE any return
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);

  // 🔁 Return early after Hook declaration
  if (!account) return null;

  const {
    name = 'Unknown',
    avatar = '/default-avatar.png',
    criticalThreats = 0,
    otherThreats = 0,
    elementsToReview = 0,
    newInsights = 0,
  } = account;

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const handleViewProfile = () => {
    console.log(`Viewing profile for ${name}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray200 bg-white px-6 py-5 dark:border-white/10 dark:bg-white/[0.04]">
      {/* Avatar and Name */}
      <div className="flex items-center gap-3 md:min-w-[220px]">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="text-[18px] dark:text-white font-space font-bold text-[#101828]">{name}</span>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-1 rounded-md dark:bg-[#FF8383]/10 bg-[#FF8383]/10 px-3 py-1.5 text-sm font-medium ">
        <Metric
          icon={<Image src="/alert.svg" width={20} height={20} alt='alertIcon' />}
          text={`Critical Threats: ${criticalThreats.toString().padStart(2, '0')}`}
          textClass="text-[#F23838] font-space font-medium text-[14px]"
        />
      </div>

      <div className="items-center gap-1.5 space-y-1.5 md:flex md:space-y-0">
        <div className="dark:bg-[#fff]/5 bg-black/5 px-1 rounded-md">
          <Metric
            id="otherThreats"
            text={`${otherThreats} Other Threats`}
            textClass="text-[#101828] font-medium text-[14px] dark:text-white font-space"
            icon={<Info className="w-4 h-4 text-gray-400" />}
            reverse
            withTooltip
            openTooltipId={openTooltipId}
            setOpenTooltipId={setOpenTooltipId}
          />
        </div>

        <div className="dark:bg-[#fff]/5 bg-black/5 px-1 rounded-md">
          <Metric
            id="elementsToReview"
            text={`${elementsToReview} Elements to Review`}
            textClass='text-black dark:text-white font-space'
            icon={<Info className="w-4 h-4 text-gray-400" />}
            reverse
            withTooltip
            openTooltipId={openTooltipId}
            setOpenTooltipId={setOpenTooltipId}
          />
        </div>

        <div className="dark:bg-[#fff]/5 bg-black/5 px-1 rounded-md">
          <Metric
            id="newInsights"
            text={`${newInsights} New Insights`}
            textClass='text-black dark:text-white font-space'
            icon={<Info className="w-4 h-4 text-gray-400" />}
            reverse
            withTooltip
            openTooltipId={openTooltipId}
            setOpenTooltipId={setOpenTooltipId}
          />
        </div>
      </div>

      {/* Button */}
      <div className="self-start sm:self-auto">
        <Link href="/dashboard-page" passHref>
          <Button
            onClick={handleViewProfile}
            className="bg-[#473BF0] font-space hover:bg-blue-700 text-white px-4 py-2 rounded-md text-[14px] font-medium flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Reusable Metric with Tooltip
function Metric({
  id,
  icon,
  text,
  textClass = 'text-gray-600',
  reverse = false,
  withTooltip = false,
  openTooltipId,
  setOpenTooltipId
}: {
  id?: string;
  icon: React.ReactNode;
  text: string;
  textClass?: string;
  reverse?: boolean;
  withTooltip?: boolean;
  openTooltipId?: string | null;
  setOpenTooltipId?: (id: string | null) => void;
}) {
  const isTooltipOpen = openTooltipId === id;
  const threats = Array.from({ length: 8 }, (_, i) => `This is threat no ${i + 1}`);

  const InfoIconWithTooltip = (
    <div className="relative">
      <button
        onClick={() => {
          if (setOpenTooltipId && id) {
            setOpenTooltipId(isTooltipOpen ? null : id);
          }
        }}
        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition"
      >
        {icon}
      </button>

      {withTooltip && isTooltipOpen && (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-[#131313] border-[white]/10 text-black shadow-2xl rounded-xl p-4 w-[370px] font-space text-[14px]">
          <div className="absolute -top-2 left-1/2 shadow-2xl -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white dark:border-b-[#131313]" />

          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[18px] font-bold dark:text-[white] text-[#101828]">{text}</h3>
            <button onClick={() => setOpenTooltipId && setOpenTooltipId(null)}>
              <X className="w-4 h-4 text-[#4A5773] dark:text-white" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[16px] dark:text-gray-200 text-[#4A5773] font-space font-normal">
            {threats.map((threat, i) => (
              <p key={i}>{i + 1}. {threat}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative flex items-center gap-2 text-[14px] font-medium">
      {reverse ? (
        <>
          <span className={textClass}>{text}</span>
          {withTooltip ? InfoIconWithTooltip : icon}
        </>
      ) : (
        <>
          {icon}
          <span className={textClass}>{text}</span>
        </>
      )}
    </div>
  );
}
