import { UserProfile } from '@/components/user/profile/UserProfile';

type UsernamePageProps = {
  params: {
    username: string;
  };
};

export default async function UsernamePage({ params }: UsernamePageProps) {
  const { username } = await params;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full overflow-x-hidden pb-8">
      <UserProfile username={username} />
    </div>
  );
}
