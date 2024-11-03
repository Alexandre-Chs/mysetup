import { getSetup, getThumbnailPhoto } from "@/actions/setup/get";
import Footer from "@/components/footer/Footer";
import Setup from "@/components/setup/Setup";

import { validateRequest } from "@/lib/auth/validate-request";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string; username: string };
}): Promise<Metadata> {
  const setup = await getSetup(params.id, params.username);

  if (!setup) {
    return {
      title: "Setup not found | MySetup",
      description: "The requested setup could not be found.",
    };
  }

  const photoUrl = await getThumbnailPhoto(setup.thumbnailId);
  const setupTitle = setup.title
    ? `${setup.title} by ${params.username}`
    : `${params.username}'s Setup`;

  return {
    title: `${setupTitle} | Setup Inspiration & Gear | MySetup`,
    description: `Explore ${params.username}'s stunning workspace setup and discover all the gear used. From desk accessories to complete setup inspiration, find everything you need.`,
    keywords: `${
      params.username
    } setup, workspace inspiration, desk setup, gaming setup, setup ideas, workspace gear, desk accessories, ${
      setup.title || "workspace setup"
    }, mysetup`,
    openGraph: {
      title: `${setupTitle} | Setup Inspiration & Gear | MySetup`,
      description: `Explore ${params.username}'s stunning workspace setup and discover all the gear used. Find your dream setup inspiration.`,
      type: "website",
      siteName: "MySetup",
      locale: "en_US",
      ...(photoUrl && {
        images: [
          {
            url: photoUrl,
            width: 1200,
            height: 630,
            alt: `${params.username}'s workspace setup`,
          },
        ],
      }),
    },
    twitter: {
      card: photoUrl ? "summary_large_image" : "summary",
      title: `${setupTitle} | MySetup`,
      description: `Explore ${params.username}'s stunning workspace setup and discover all the gear used.`,
      ...(photoUrl && {
        images: [photoUrl],
      }),
    },
  };
}

export default async function Page({
  params,
}: {
  params: { id: string; username: string };
}) {
  const { user } = await validateRequest();

  const setup = await getSetup(params.id, params.username);
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
