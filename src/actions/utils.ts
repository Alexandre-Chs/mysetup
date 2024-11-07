"use server";

export const discordLog = async (content: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log('DISCORD EVENT :', content);
    return
  };
  await fetch(process.env.DISCORD_WEBHOOK!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });
};