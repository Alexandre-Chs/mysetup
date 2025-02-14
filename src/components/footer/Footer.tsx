'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t border-[#1B1C1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/terms" className="text-sm text-textColorLighter hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-textColorLighter hover:text-white transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};
