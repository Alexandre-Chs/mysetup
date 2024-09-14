import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-20 mt-auto">
      <div className="relative h-full border-t-[1px] border-t-separator/25 overflow-hidden">
        <div className="absolute inset-0 bg-[#07080A]/60 backdrop-blur-xl z-10"></div>

        <div className="relative z-20 max-w-lg mx-auto h-full flex items-center justify-between text-white px-4">
          <p className="hover:text-gray-300 transition-colors cursor-pointer">
            <Link href="#">Terms</Link>
          </p>
          <p className="hover:text-gray-300 transition-colors cursor-pointer">
            <Link href="#">Privacy</Link>
          </p>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[200px] h-[150px]">
          <div
            className={`
            absolute inset-0 w-[300px] left-1/2 -translate-x-1/2 rotate-180
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--aurora)]
            [background-size:200%]
            [background-position:50%_50%]
            filter blur-[40px]
            [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]
            opacity-50
          `}
          ></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
