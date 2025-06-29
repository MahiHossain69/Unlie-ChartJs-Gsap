'use client';

import {
  AlertTriangle,
  Shield,
  FileText,
  Lightbulb,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  // Early return if account is not provided
  if (!account) {
    return (
      <Card className="p-6 text-center text-sm text-gray-500">
        No account data available.
      </Card>
    );
  }

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
   <div className="container mx-auto">
     <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 bg-white border border-slate-200">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                {name}
              </h3>
            </div>
          </div>
          <Button
            onClick={handleViewProfile}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 flex items-center space-x-1"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">View</span>
          </Button>
        </div>

        {/* Mobile Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <MetricItem
            icon={<AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />}
            label="Critical"
            value={criticalThreats.toString().padStart(2, '0')}
            className="bg-red-500 hover:bg-red-600"
          />
          <MetricItem
            icon={<Shield className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />}
            label="Other"
            value={otherThreats}
          />
          <MetricItem
            icon={<FileText className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />}
            label="Review"
            value={elementsToReview}
          />
          <MetricItem
            icon={<Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />}
            label="Insights"
            value={newInsights}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-6 xl:space-x-8">
          <TooltipWrapper label="Critical Threats" description="Number of critical security threats detected">
            <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
              {criticalThreats.toString().padStart(2, '0')}
            </Badge>
          </TooltipWrapper>

          <TooltipWrapper label="Other Threats" description="Number of other security issues identified">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
              {otherThreats}
            </Badge>
          </TooltipWrapper>

          <TooltipWrapper label="Elements to Review" description="Security items needing manual review">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
              {elementsToReview}
            </Badge>
          </TooltipWrapper>

          <TooltipWrapper label="New Insights" description="Number of new security insights available">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
              {newInsights}
            </Badge>
          </TooltipWrapper>

          <Button
            onClick={handleViewProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Profile</span>
          </Button>
        </div>
      </div>
    </Card>
   </div>
  );
}

// Reusable UI Components

function MetricItem({
  icon,
  label,
  value,
  className = 'bg-slate-100 text-slate-700 hover:bg-slate-200',
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-1">
        {icon}
        <span className="text-xs sm:text-sm font-medium text-slate-600">{label}</span>
      </div>
      <Badge variant="secondary" className={`w-fit ${className}`}>
        {value}
      </Badge>
    </div>
  );
}

function TooltipWrapper({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600">{label}:</span>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
