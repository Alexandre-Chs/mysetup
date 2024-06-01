import Feed from "@/components/feed/Feed";
import { validateRequest } from "@/lib/auth/validate-request";

export default async function Home() {
  const { user } = await validateRequest();
  console.log(user);
  if (!user) {
    <div>Not connected !</div>;
  }
  return (
    <div>
      <h1>Hello, {user?.username}!</h1>
      <Feed />
    </div>
  );
}
