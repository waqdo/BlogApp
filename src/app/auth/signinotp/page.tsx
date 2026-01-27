"use client";

import SignInOTPForm from '@/components/SignInOTPForm';

export default function SignInOTPPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In with OTP</h1>
        <SignInOTPForm />
      </div>
    </div>
  );
}