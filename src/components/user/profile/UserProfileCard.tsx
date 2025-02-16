import Image from 'next/image';
import Link from 'next/link';
import UpdateUserProfileCard from './UserProfileUpdateInfos';
import { SocialIcons } from '@/components/common/SocialIcons';
import { UserInfos } from '@/app/api/users/actions';

export const UserProfileCard = async ({ username, setups }: { username: string; setups: any }) => {
  const userInfos = await UserInfos(username);

  return (
    <>
      <div className="absolute top-5 right-5">
        <UpdateUserProfileCard userInfos={userInfos} />
      </div>
      <div className="relative flex flex-col items-center justify-center h-full gap-y-12" style={{ pointerEvents: 'none' }}>
        <div className="flex flex-col items-center justify-center gap-y-4 w-[300px] flex-wrap">
          <Image className="rounded-full" src={userInfos?.media?.url || '/default-user.jpg'} width={96} height={96} alt="user image" />
          <h1 className="flex items-start justify-center text-2xl text-textColorLighter font-bold">{username}</h1>
          <p className="text-sm w-3/4 text-textColorLighter text-center">{userInfos && userInfos.profile ? userInfos.profile.profileDescription : 'No description yet'}</p>
          <div className="flex flex-col  text-textColor items-center justify-center">
            <p>{setups?.length} setup posted</p>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center w-full px-12">
          <div style={{ pointerEvents: 'auto' }} className="flex items-center justify-center cursor-pointer pointer-events-auto gap-x-2">
            {userInfos &&
              userInfos.socialLinks.map((link) => (
                <Link key={link.id} href={link.link} style={{ pointerEvents: 'auto' }} className="flex items-center justify-center p-1 rounded-xl w-full cursor-pointer pointer-events-auto">
                  {SocialIcons(link.socialName)}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
