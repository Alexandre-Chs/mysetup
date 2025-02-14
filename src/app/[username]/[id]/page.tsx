import { getSetup, getThumbnailPhoto } from '@/app/api/setups/actions';
import { Footer } from '@/components';
import Setup from '@/components/setup/Setup';

import { validateRequest } from '@/lib/auth/validate-request';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string; username: string } }): Promise<Metadata> {
  const { id, username } = await params;
  const setup = await getSetup(id, username);

  if (!setup) {
    return {
      title: 'Setup not found | MySetup',
      description: 'The requested setup could not be found.',
    };
  }

  const photoUrl = await getThumbnailPhoto(setup.thumbnailId);
  const setupTitle = setup.title ? `${setup.title} by ${username}` : `${username}'s Setup`;

  return {
    title: `${setupTitle} | Setup Inspiration & Gear | MySetup`,
    description: `Explore ${username}'s stunning workspace setup and discover all the gear used. From desk accessories to complete setup inspiration, find everything you need.`,
    keywords: `${username} setup, workspace inspiration, desk setup, gaming setup, setup ideas, workspace gear, desk accessories, ${setup.title || 'workspace setup'}, mysetup`,
    openGraph: {
      title: `${setupTitle} | Setup Inspiration & Gear | MySetup`,
      description: `Explore ${username}'s stunning workspace setup and discover all the gear used. Find your dream setup inspiration.`,
      type: 'website',
      siteName: 'MySetup',
      locale: 'en_US',
      ...(photoUrl && {
        images: [
          {
            url: photoUrl,
            width: 1200,
            height: 630,
            alt: `${username}'s workspace setup`,
          },
        ],
      }),
    },
    twitter: {
      card: photoUrl ? 'summary_large_image' : 'summary',
      title: `${setupTitle} | MySetup`,
      description: `Explore ${username}'s stunning workspace setup and discover all the gear used.`,
      ...(photoUrl && {
        images: [photoUrl],
      }),
    },
  };
}

export default async function Page({ params }: { params: { id: string; username: string } }) {
  const { user } = await validateRequest();
  const { id, username } = await params;
  const setup = await getSetup(id, username);
  if (!setup || (!setup.isPublished && setup.userId !== user?.id)) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-[80px]">
      <Setup setup={setup} user={user} />
      <Footer />
    </div>
  );
}
