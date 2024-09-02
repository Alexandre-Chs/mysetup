import React from "react";

const LeaderboardTable = () => {
  const items = [
    { username: "You", setup: "0.00", upvotes: 0 },
    { username: "marion_stiedemann", setup: "2.00", upvotes: 5 },
    { username: "shannon_kautzer", setup: "2.00", upvotes: 5 },
    { username: "arthur_grimes", setup: "2.00", upvotes: 5 },
    { username: "bernadette_mclaughlin", setup: "2.00", upvotes: 5 },
    { username: "alberta_spencer", setup: "2.00", upvotes: 5 },
    { username: "leo_ruecker", setup: "2.00", upvotes: 5 },
    { username: "rudolph_boehm", setup: "2.00", upvotes: 5 },
  ];

  return (
    <table className="w-full border border-[#212124]">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-textColor border-[1px] text-center border-[#212124]">
            Rank
          </th>
          <th className="px-4 py-2 text-left text-textColor border-[1px] text-center border-[#212124]">
            Player
          </th>
          <th className="px-4 py-2 text-left text-textColor border-[1px] text-center border-[#212124]">
            Won
          </th>
          <th className="px-4 py-2 text-left text-textColor border-[1px] text-center border-[#212124]">
            Trades
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="border-b border-[#212124]">
            <td className="px-4 py-2 text-colorTextLighter border-[1px] border-[#212124] text-center">
              {index + 1}
            </td>
            <td className="px-4 py-2 text-center text-colorTextLighter border-[1px] border-[#212124]">
              {item.username}
            </td>
            <td className="px-4 py-2 text-colorTextLighter border-[1px] border-[#212124] text-center">
              {item.setup}
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
