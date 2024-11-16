import React, { PropsWithChildren } from "react";

const Border = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="relative h-full">
      <div className="absolute -inset-2 h-full rounded-lg bg-gradient-to-b from-gray-400/35 via-gray-600/35 to-gray-800/35 opacity-50 blur-2xl"></div>
      <div className="relative h-full border border-zinc-700/50 rounded-lg bg-zinc-900/50 text-slate-300">
        {children}
      </div>
    </div>
  );
};

export default Border;
