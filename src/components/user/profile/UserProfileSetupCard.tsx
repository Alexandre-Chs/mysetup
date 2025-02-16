'use client';

import { cn } from '@/utils/cn';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export const UserProfileSetupCard = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn('transition duration-300', isLoading ? 'blur-sm' : 'blur-0', className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      priority
      decoding="async"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Photo of a beautiful setup'}
      {...rest}
    />
  );
};
