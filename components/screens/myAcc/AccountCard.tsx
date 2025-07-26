'use client';

import {
  Info,
  Eye,
} from 'lucide-react';
import { TbAlertHexagonFilled } from "react-icons/tb";

import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

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
    <div className="flex flex-col sm:flex-row sm:items-center xl:justify-between  gap-4 sm:gap-0 py-4 px-4 sm:px-3  bg-white dark:bg-white/5 border dark:border-white/10 rounded-lg transition-colors">
      
      {/* Avatar and Name */}
      <div className="flex items-center gap-1 min-w-[185px]">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="text-[15px] dark:text-white font-space  font-medium text-gray-900">{name}</span>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-1 flex-1">
        <div className="dark:bg-[#FF83831A]/10 bg-[#FF83831A]/10 px-1 rounded-md">
          <Metric
            icon={<TbAlertHexagonFilled className="w-4 h-4 text-[#F23838]" />}
            text={`Critical Threats: ${criticalThreats.toString().padStart(2, '0')}`}
            textClass="text-red-500 font-space"
          />
        </div>

        <div className="dark:bg-[#fff]/5 bg-black/5 px-1 rounded-md">
          <Metric
            text={`${otherThreats} Other Threats`}
            textClass="text-black dark:text-white font-space"
            icon={<Info className="w-4 h-4 text-gray-400" />}
            reverse
          />
        </div>

        <div className="dark:bg-[#fff]/5 bg-black/5 px-1 rounded-md">
          <Metric
          text={`${elementsToReview} Elements to Review`}
          textClass='text-black dark:text-white font-space'
          icon={<Info className="w-4 h-4 text-gray-400" />}
          reverse
        />
        </div>

        <div className="dark:bg-[#fff]/5 bg-black/5 px-1 rounded-md">
          <Metric
          text={`${newInsights} New Insights`}
          textClass='text-black dark:text-white font-space'
          icon={<Info className="w-4 h-4 text-gray-400" />}
          reverse
        />
        </div>
      </div>

      {/* Button */}
      <div className="self-start sm:self-auto">
        <Button
          onClick={handleViewProfile}
          className="bg-[#473BF0] font-space hover:bg-blue-700  text-white px-4 py-2 rounded-md text-[14px] font-medium flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Profile
        </Button>
      </div>
    </div>
  );
}

// Reusable Metric
function Metric({
  icon,
  text,
  textClass = 'text-gray-600',
  reverse = false,
}: {
  icon: React.ReactNode;
  text: string;
  textClass?: string;
  reverse?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-[14px] font-medium">
      {reverse ? (
        <>
          <span className={textClass}>{text}</span>
          {icon}
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
