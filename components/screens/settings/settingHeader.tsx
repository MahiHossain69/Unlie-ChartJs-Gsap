import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { RiHome2Line } from 'react-icons/ri'

const settingHeader = () => {
  return (
    <div className=" px-4 sm:px-6 md:px-8 py-4">
      <div className="">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white font-space">
          Settings
        </h1>

        {/* Breadcrumb */}
        <Breadcrumb className="mt-3">
          <BreadcrumbList className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-gray-600 dark:text-gray-300">
                <RiHome2Line className="text-xl" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-space text-black dark:text-white">
                John Due
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default settingHeader
