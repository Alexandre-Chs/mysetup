import React, { PropsWithChildren } from "react";

const Border = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute -inset-2 h-full rounded-lg bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-600 to-gray-600 opacity-25 blur-2xl"></div>
      <div className="relative h-full border border-zinc-900 rounded-lg bg-zinc-950 text-slate-300">{children}</div>
    </div>
  );
};

export default Border;
