'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { SetupById } from '@/app/api/setups/actions';

export function useIsOwner(setupId: string) {
  const { user } = useUser();
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!setupId || !user) {
      setIsOwner(false);
      setIsLoading(false);
      return;
    }

    async function checkOwnership() {
      if (!user || !setupId) {
        setIsOwner(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const setup = await SetupById(setupId);
        setIsOwner(setup?.userId === user.id);
      } catch (error) {
        console.error('Error when getting setupId in useIsOwner', error);
        setIsOwner(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkOwnership();
  }, [setupId, user]);

  return { isOwner, isLoading };
}
