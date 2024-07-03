'use client'

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/crud';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [user] = useAuthState(auth);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (!user && status !== 'loading' && !userSession) {
      router.push('/sign-in');
    }
  }, [user, status, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (status === 'loading' || (!user && !sessionStorage.getItem('user'))) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="relative px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="flex space-x-4">
          <Button onClick={handleLogout}> Log Out </Button>
          <Button> Hello </Button>
        </div>
      </div>
    </div>
  );
}
