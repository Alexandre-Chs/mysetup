import clsx from "clsx";
import { Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const LeaderboardTable = () => {
  const items = [
    {
      title: "My ultimate gaming setup with RTX 4090",
      username: "amelia_brown",
      setup: "#",
      upvotes: 12,
    },
    {
      title: "Artistic workstation setup with dual monitors",
      username: "josephine_ortiz",
      setup: "#",
      upvotes: 8,
    },
    {
      title: "Summer setup with RTX 3070 and LED lights",
      username: "liam_jones",
      setup: "#",
      upvotes: 15,
    },
    {
      title: "Minimalist office setup with standing desk",
      username: "olivia_martinez",
      setup: "#",
      upvotes: 20,
    },
    {
      title: "Cozy winter setup with heated chair and 3080",
      username: "noah_smith",
      setup: "#",
      upvotes: 18,
    },
    {
      title: "RGB heaven with water-cooled PC",
      username: "sophia_taylor",
      setup: "#",
      upvotes: 25,
    },
    {
      title: "Home theater setup with 4K projector",
      username: "lucas_johnson",
      setup: "#",
      upvotes: 22,
    },
    {
      title: "Portable setup for digital nomads",
      username: "mia_wilson",
      setup: "#",
      upvotes: 10,
    },
    {
      title: "High-end audio setup with surround sound",
      username: "ethan_davis",
      setup: "#",
      upvotes: 30,
    },
    {
      title: "Sleek workstation with ultra-wide monitor",
      username: "isabella_moore",
      setup: "#",
      upvotes: 17,
    },
  ];

  return (
    <table className="w-full border border-[#212124] max-w-6xl mx-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-textColor border-[1px] text-center border-[#212124]">
            Rank
          </th>
          <th className="px-4 py-2 text-textColor border-[1px] text-center border-[#212124]">
            Username
          </th>
          <th className="px-4 py-2 text-textColor border-[1px] text-center border-[#212124]">
            Setup
          </th>
          <th className="px-4 py-2 text-textColor border-[1px] text-center border-[#212124]">
            Upvotes
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="border-b border-[#212124]">
            <td
              className={clsx(
                "relative px-4 py-2 text-colorTextLighter border-[1px] border-[#212124] text-center",
                index === 0 && "font-bold text-redText"
              )}
            >
              [ {index + 1} ]
              {index === 0 && (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-6 h-6 bg-redText/35 rounded-full blur-xl"></div>
              )}
            </td>
            <td className="px-4 py-2 text-center text-colorTextLighter border-[1px] border-[#212124]">
              {item.username}
            </td>
            <td className="px-4 py-2 text-colorTextLighter border-[#212124] text-center flex items-center justify-center">
              <Link
                href={`/${item.setup}`}
                className="text-colorTextLighter hidden md:block"
              >
                {item.title}
              </Link>
              <div className="block md:hidden cursor-pointer">
                <Link href={`/${item.setup}`}>
                  <Link2 />
                </Link>
              </div>
            </td>
            <td className="px-4 py-2 text-colorTextLighter border-[1px] border-[#212124] text-center">
              {item.upvotes}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
