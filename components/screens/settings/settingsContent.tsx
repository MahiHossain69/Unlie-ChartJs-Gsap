"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import {  Check } from "lucide-react"
import { FiEdit } from "react-icons/fi";

import { gsap } from "gsap"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const SettingsContent = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el
  }

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileName, setProfileName] = useState("John Due")

  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [fullName, setFullName] = useState("John Due")
  const [email, setEmail] = useState("username@gmail.com")

  const [notificationSetting, setNotificationSetting] = useState("hourly")

  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className=" w-full bg-gray-50 border border-[#E4E7EC] dark:border-[#FFFFFF33] dark:bg-[#FFFFFF0A] rounded-xl p-4 sm:p-6 lg:p-8 flex justify-center items-start">
      <div className="w-full space-y-6 ">

        {/* Profile Header */}
        <div
          ref={setCardRef(0)}
          className="bg-white border border-[#D0D5DD] dark:bg-transparent dark:border-[#344054] rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/john.svg" alt="John Due" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="text-[20px] dark:text-white font-semibold font-space text-gray-900 border-b border-gray-300 focus:outline-none focus:border-[#6366F1] bg-transparent"
              />
            ) : (
              <h2 className="text-[20px] font-space font-bold dark:text-white text-[#101828]">{profileName}</h2>
            )}
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-2xl shadow-none border dark:border-[#344054] dark:bg-[#FFFFFF0A] dark:text-white border-[#D0D5DD] text-gray-700 hover:text-gray-900 bg-transparent"
            onClick={() => {
              if (isEditingProfile) {
                console.log("Saving Profile Name:", profileName)
              }
              setIsEditingProfile(!isEditingProfile)
            }}
          >
            {isEditingProfile ? <Check className="h-4 text-[#101828] dark:text-white w-4" /> : <FiEdit className="h-4 text-[#101828] dark:text-white w-4" />}
            <span className="font-space font-medium text-[#101828] dark:text-white">{isEditingProfile ? "Save" : "Edit"}</span>
          </Button>
        </div>

        {/* Personal Information */}
        <div
          ref={setCardRef(1)}
          className="bg-white border border-[#D0D5DD]  dark:border-[#344054] dark:bg-transparent rounded-xl p-4 sm:p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-space font-medium text-[#101828] dark:text-white">Personal Information</h3>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-2xl shadow-none border dark:border-[#344054] dark:bg-[#FFFFFF0A] dark:text-white border-[#D0D5DD] text-gray-700 hover:text-gray-900 bg-transparent"
              onClick={() => {
                if (isEditingPersonal) {
                  console.log("Saving Personal Information:", { fullName, email })
                }
                setIsEditingPersonal(!isEditingPersonal)
              }}
            >
              {isEditingPersonal ? <Check className="h-4 text-[#101828] dark:text-white w-4" /> : <FiEdit className="h-4 text-[#101828] dark:text-white w-4" />}
              <span className="font-space text-[#101828] dark:text-white font-medium">{isEditingPersonal ? "Save" : "Edit"}</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-space font-normal dark:text-[#D0D5DD] text-[#4A5773]">Full Name</p>
              {isEditingPersonal ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-base font-space font-medium text-[#101828]dark:text-white border-b border-gray-300 focus:outline-none focus:border-[#6366F1] bg-transparent w-full"
                />
              ) : (
                <p className="text-base font-medium font-space dark:text-white text-[#101828]">{fullName}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-space font-normal dark:text-[#D0D5DD] text-[#4A5773]">Email</p>
              {isEditingPersonal ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base font-space font-medium dark:text-white text-[#101828] border-b border-gray-300 focus:outline-none focus:border-[#6366F1] bg-transparent w-full"
                />
              ) : (
                <p className="text-base font-medium dark:text-white font-space text-[#101828]">{email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div
          ref={setCardRef(2)}
          className="bg-white border border-[#D0D5DD] dark:bg-transparent dark:border-[#344054] rounded-xl p-4 sm:p-6 space-y-4"
        >
          <h3 className="text-[18px] font-space font-medium dark:text-white text-[#101828]">Notification Settings</h3>
          <div className="flex gap-[15px]">
            <Label htmlFor="email-notification" className="text-sm font-normal dark:text-[#D0D5DD] font-space text-[#4A5773] mb-4 block">
              Email Notification
            </Label>
            <RadioGroup
              defaultValue="hourly"
              value={notificationSetting}
              onValueChange={setNotificationSetting}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="hourly" id="hourly" className="text-transparent " />
                <Label htmlFor="hourly" className="text-base font-space dark:text-white font-medium text-[#101828] cursor-pointer">
                  Hourly
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="daily" id="daily" className="text-transparent " />
                <Label htmlFor="daily" className="text-base font-space dark:text-white  font-medium text-[#101828] cursor-pointer">
                  Daily
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="none" className="text-transparent " />
                <Label htmlFor="none" className="text-base dark:text-white font-space font-medium text-[#101828] cursor-pointer">
                  None
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-[#473BF0] hover:bg-[#7067f6] text-white px-6 py-2 rounded-md text-base font-medium"
              onClick={() => {
                console.log("Saving Notification Setting:", notificationSetting)
              }}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Contact Link */}
        <div className="text-[16px] font-space font-medium text-[#4A5773] dark:text-[#98A2B3] mt-8 text-center sm:text-left">
          If you need any help{" "}
          <Link href="#" className="text-[#473BF0] dark:text-[#665CF3] font-space text-[16px] hover:underline font-medium">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SettingsContent
