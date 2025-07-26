'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form and close modal
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative bg-white dark:bg-[#070C22] rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out",
        "animate-in fade-in-0 zoom-in-95"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-xl font-bold font-space text-gray-900 dark:text-white">Contact Us</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100 text-[#4A5773] hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-space font-medium text-[#101828] dark:text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full px-3 py-2 dark:text-white  bg-gray-100 placeholder:text-[#FFFFFF80]/50 dark:!border-white/10 !border font-space placeholder:text-[13px] placeholder:font-normal placeholder:font-space !border-[#D0D5DD] dark:bg-[rgba(255,255,255,0.1)] text-black border-[rgba(255,255,255,0.1)] rounded-lg"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-space font-medium text-[#101828] dark:text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-3 py-2 dark:text-white bg-gray-100 placeholder:text-[#FFFFFF80]/50 dark:!border-white/10 !border font-space placeholder:text-[13px] placeholder:font-normal placeholder:font-space !border-[#D0D5DD] dark:bg-[rgba(255,255,255,0.1)] text-black border-[rgba(255,255,255,0.1)] rounded-lg"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-space font-medium text-[#101828] dark:text-white">
              Text
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type Your Message"
              rows={4}
              className="w-full px-3 py-2 dark:text-white  bg-gray-100 placeholder:text-[#FFFFFF80]/50 dark:!border-white/10 !border font-space placeholder:text-[13px] placeholder:font-normal placeholder:font-space !border-[#D0D5DD] dark:bg-[rgba(255,255,255,0.1)] text-black border-[rgba(255,255,255,0.1)] rounded-lg resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#473BF0] hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                
                <span>Send</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}