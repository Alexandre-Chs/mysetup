'use client';

import { User } from '@/app/api/users/actions';
import { createContext, useContext, useEffect, useState } from 'react';
import { set } from 'zod';

type User = {
  id: string;
  username: string;
  email: string;
  pictureId?: string;
  isFirstVisit: boolean;
  emailVerified: boolean;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  refetchUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const res = await User();
      if (!res) {
        setUser(null);
        return;
      }
      setUser(res);
    } catch (error) {
      console.error('Error when getting user', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return <UserContext.Provider value={{ user, isLoading, refetchUser: fetchUserData }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
