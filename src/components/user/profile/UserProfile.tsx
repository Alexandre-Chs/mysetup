import { Divider } from '@heroui/react';
import { CarouselUserProfileCard } from './CarouselUserProfileCard';
import { UserProfileGlareCard } from './UserProfileGlareCard';
import { UserSetups } from '@/app/api/setups/actions';
import { UserProfileCard } from './UserProfileCard';

type ProfileProps = {
  username: string;
};

export const UserProfile = async ({ username }: ProfileProps) => {
  const setups = await UserSetups(username);
  const setupsParse = setups.map((setup) => {
    return {
      id: setup.id,
      name: setup.name,
      description: setup.description,
      photo: { url: setup.setupMedias[0]?.media.url || '' },
      user: { username: setup.user.username || 'Unknown user' },
    };
  });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1500px] mx-auto px-4">
      <div className="flex flex-col xl:flex-row w-full h-full items-center justify-start xl:gap-x-32">
        <div className="group relative flex-shrink-0">
          <div className="absolute -left-[5px] top-0 w-[320px] h-[400px] group-hover:bg-[#2f2f37] blur-xl transition-colors rounded-xl"></div>
          <UserProfileGlareCard className="relative z-50">
            <UserProfileCard username={username} setups={setups} />
          </UserProfileGlareCard>
        </div>
        <Divider orientation="vertical" className="hidden xl:block h-[600px] w-[1px] bg-gradient-to-t from-transparent via-separator/20 to-transparent mx-4 md:mx-6 lg:mx-8 flex-shrink-0" />
        <div className="flex-grow overflow-x-auto w-full">
          <CarouselUserProfileCard setups={setupsParse} />
        </div>
      </div>
    </div>
  );
};
