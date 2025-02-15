'use client';

import { resetPassword } from '@/app/api/(auth)/reset-password/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const AuthResetPassword = () => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    try {
      setIsSendingEmail(true);
      setError('');
      await resetPassword(email);
      toast.success('Password reset email sent');
      router.push('/login');
    } catch (e) {
      setError('An error occurred, please try again later');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
        <input
          name="email"
          id="email"
          placeholder="Email"
          className="placeholder:text-textColor w-full rounded-[8px] bg-[#141516] px-4 py-3 text-sm text-textColor border-1 border-[#393b3e]/25 hover:border-[#4F5051] focus:border-[#6f7073] focus:outline-none transition-colors"
        />
        <button type="submit" className="w-full text-black bg-[#D0D1D1] relative px-4 py-2 rounded-[8px] flex items-center justify-center group">
          <p>{isSendingEmail ? 'Loading...' : 'Continue'}</p>
          <div className="absolute -top-[7px] -left-[27px] w-[350px] h-[55px] group-hover:bg-white/20 blur-xl transition-colors rounded-xl "></div>
        </button>
      </form>
      <Link href="/login" className="text-textColor text-sm w-full flex items-center justify-center group hover:text-white transition-colors mt-6">
        Back to login
      </Link>
      {error && <p className="text-red-500 text-center text-xs mt-4">{error}</p>}
    </div>
  );
};
