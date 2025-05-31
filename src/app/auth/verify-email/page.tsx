'use client';

import { useSearchParams } from 'next/navigation';
import { EmailVerification } from '@/components/auth/email-verification';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || undefined;

  return (
    <div className="container mx-auto py-10 md:py-20">
      <div className="mx-auto max-w-xl space-y-6 bg-card p-8 rounded-lg shadow-md">
        <EmailVerification token={token} />
      </div>
    </div>
  );
}