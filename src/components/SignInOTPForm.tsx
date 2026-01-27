'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { emailOTPSchema, verifyOTPSchema, EmailOTPInput, VerifyOTPInput } from '@/lib/validations';
import { useAuth } from '@/contexts/AuthContext';

export default function SignInOTPForm() {
  const { signInWithOTP, verifyOTP, error: authError } = useAuth();
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const emailForm = useForm<EmailOTPInput>({
    resolver: zodResolver(emailOTPSchema),
  });

  const otpForm = useForm<VerifyOTPInput>({
    resolver: zodResolver(verifyOTPSchema),
  });

  const handleEmailSubmit = async (data: EmailOTPInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      await signInWithOTP(data.email);
      setEmail(data.email);
      setStep('verify');
    } catch (err) {
      setServerError(authError || 'Failed to send OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPSubmit = async (data: VerifyOTPInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      await verifyOTP(email, data.token);
      // Redirect will happen automatically after auth state update
    } catch (err) {
      setServerError(authError || 'Invalid OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'email') {
    return (
      <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
        {serverError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            {serverError}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...emailForm.register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailForm.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {emailForm.formState.errors.email.message}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600">
          We'll send you a one-time code via email to verify your identity.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Code'}
        </button>

        <Link
          href="/auth/signin"
          className="block text-center text-sm text-blue-600 hover:underline"
        >
          Back to Password Sign In
        </Link>
      </form>
    );
  }

  return (
    <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
          {serverError}
        </div>
      )}

      <div>
        <p className="text-sm text-gray-600 mb-4">
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>

        <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
          Verification Code
        </label>
        <input
          id="token"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          {...otpForm.register('token')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
        />
        {otpForm.formState.errors.token && (
          <p className="mt-1 text-sm text-red-600">
            {otpForm.formState.errors.token.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Verifying...' : 'Verify Code'}
      </button>

      <button
        type="button"
        onClick={() => {
          setStep('email');
          setServerError(null);
        }}
        className="block text-center text-sm text-blue-600 hover:underline w-full"
      >
        Use a different email
      </button>
    </form>
  );
}
