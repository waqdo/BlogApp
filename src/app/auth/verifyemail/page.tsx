'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifyEmailPage() {
  const { user, signOut } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const resendVerificationEmail = async () => {
    setIsResending(true);
    setMessage(null);

    try {
      if (!user?.email) {
        setMessage('No email found for the current user.');
        return;
      }

      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        setMessage('Failed to resend verification email.');
      } else {
        setMessage('Verification email resent successfully.');
      }
    } catch (err) {
      setMessage('An error occurred while resending the email.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-gray-700 mb-4">
        A verification email has been sent to your email address. Please check your inbox and click the verification link.
      </p>

      {message && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 mb-4">
          {message}
        </div>
      )}

      <button
        onClick={resendVerificationEmail}
        disabled={isResending}
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isResending ? 'Resending...' : 'Resend Verification Email'}
      </button>

      <button
        onClick={async () => {
          await signOut();
          router.push('/auth/signin');
        }}
        className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
