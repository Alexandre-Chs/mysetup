'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VerifyEmail } from '@/app/api/(auth)/verification-email/actions';

type EmailVerificationPageProps = {
  params: {
    token: string;
  };
};

export default function EmailVerificationPage({ params }: EmailVerificationPageProps) {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        await VerifyEmail(params.token);
        setStatus('success');
        setTimeout(() => router.push('/'), 3000);
      } catch (error) {
        console.error('error when verifying email', error);
        setStatus('error');
      }
    };

    verify();
  }, [params.token, router]);

  return (
    <div>
      {status === 'verifying' && <p>We are verifying your email...</p>}
      {status === 'success' && <p>Email verified successfully! Redirecting...</p>}
      {status === 'error' && <p>Error while verifying your email. Please try again.</p>}
    </div>
  );
}
