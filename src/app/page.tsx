import { Home } from '@/components/home/Home';

export default async function Homepage() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#07080A_40%,#000_60%)] bg-cover bg-center">
      <Home />
    </div>
  );
}
