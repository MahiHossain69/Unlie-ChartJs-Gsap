'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/screens/myAcc/sideBar';
import Header from '@/components/screens/myAcc/header';
import AccountsList from '@/components/screens/myAcc/AccountsList';
import ContactModal from '@/components/screens/myAcc/contactus';
import Email from "@/public/email.svg"
import Image from 'next/image';

export default function Dashboard() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [authenticated, setAuthenticated] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [currentUser] = useState({
    name: 'Adam Root',
    avatar: "/adamroot.svg",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== 'admin') {
      setError('username');
    } else if (password !== 'admin') {
      setError('password');
    } else {
      setAuthenticated(true);
      setError('');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('email');
      return;
    }
    setEmailSent(true);
    setError('');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#11162B] px-4">
        <div className="max-w-md bg-white/5 border border-white/10 w-full space-y-6 rounded-2xl shadow-lg p-8">
          {!showForgot ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <h2 className="text-center font-space mb-0 text-[#fff] text-[24px] font-bold">
                Welcome Back
              </h2>
              <h2 className="text-center font-space text-[#98A2B3] text-[14px] font-normal">
                Enter your credentials to continue
              </h2>

              <div className='space-y-2'>
                <label className='font-space text-[14px] font-normal text-white'>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg text-sm placeholder:text-white/50 font-space text-white border-white/10 bg-white/5 ${
                    error === 'username' ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {error === 'username' && (
                  <p className="text-red-500 text-sm mt-1">Invalid Username</p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='font-space text-[14px] font-normal text-white'>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg  placeholder:text-white/50 font-space text-white border-white/10 bg-white/5 text-sm ${
                    error === 'password' ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {error === 'password' && (
                  <p className="text-red-500 text-sm mt-1">
                    The password you entered is incorrect. Please try again or reset your password.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center font-space text-[16px] font-normal text-[#fff] gap-2 text-sm ">
                  <input type="checkbox" className="w-4 h-4 rounded border border-[#98A2B3] bg-white/5" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-[#473BF0] font-space text-sm font-semibold"
                  onClick={() => setShowForgot(true)}
                >
                  Forget Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#433BFF] hover:bg-[#372fff] text-white py-3 rounded-xl font-semibold text-base"
              >
                Sign In
              </button>
            </form>
          ) : !emailSent ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <h2 className="text-center font-space mb-0 text-[#fff] text-[24px] font-bold">
                Forget Password?
              </h2>
              <p className="text-center font-space text-[#666D80] text-[14px] font-normal">
                Enter the email address associated with your account
                and we will send you 6 digit code to reset your password.
              </p>
              <div className="space-y-3">
                <label className="font-space text-[14px] font-normal text-white">
                  Email 
                </label>
                <input
                  type="email"
                  placeholder="Type your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border placeholder:font-space font-space text-white border-white/10 bg-white/5 rounded-lg ${
                    error === 'email' ? 'border-red-500' : ''
                  }`}
                />
                {error === 'email' && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
              >
                Continue
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <Image src={Email} alt="Email Sent" className="mx-auto w-[120px] h-[106px]" />
              <h1 className='text-center font-space font-bold text-[24px] text-white'>Check Your Email</h1>
              <p className="text-[#D0D5DD] font-normal text-[14px] font-space">
                If an account with this email address exists in our system,
                we’ve sent a password reset link to your email.
                Please check your inbox (and spam folder) for further instructions.
              </p>
              <button
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
                onClick={() => setShowForgot(false)}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="flex h-screen bg-white dark:bg-[#101828] text-slate-900 dark:text-white transition-colors">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onContactClick={() => setContactModalOpen(true)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            user={currentUser}
            onMenuClick={() => setSidebarOpen(true)}
            onThemeToggle={toggleTheme}
            theme={theme}
          />
          <main className="flex-1 overflow-y-auto bg-[#e4e7ef] dark:bg-[rgb(7,12,32)] transition-colors duration-300">
            <AccountsList />
          </main>
        </div>
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </div>
    </section>
  );
}
