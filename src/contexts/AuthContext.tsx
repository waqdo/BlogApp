'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthApiError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    async function checkUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error checking user session:', err);
      } finally {
        setLoading(false);
      }
    }

    checkUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      setError(null);
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'Sign up failed';
      setError(message);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/`,
        },
      });

      if (googleError) throw googleError;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'Google sign in failed';
      setError(message);
      throw err;
    }
  };

  const signInWithOTP = async (email: string) => {
    try {
      setError(null);
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
        },
      });

      if (otpError) throw otpError;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'OTP request failed';
      setError(message);
      throw err;
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      setError(null);
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (verifyError) throw verifyError;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'OTP verification failed';
      setError(message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'Sign out failed';
      setError(message);
      throw err;
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      setError(null);
      // Supabase does not have a direct resend verification email method.
      // Trigger a resend by updating the user's email to the same value.
      const { error } = await supabase.auth.updateUser({ email });

      if (error) throw error;
    } catch (err) {
      const message =
        err instanceof AuthApiError ? err.message : 'Failed to resend verification email';
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithOTP,
        verifyOTP,
        signOut,
        resendVerificationEmail, // Add this to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
