"use server";

import { validateRequest } from "@/lib/auth/validate-request";
import { discordLog } from "../utils";

export async function signalSetup(setupId: string, reason: string, explication?: string) {
  const { user } = await validateRequest();

  await discordLog(`🚨 Signal du setup ${setupId} par ${user?.username} !\nRaison : ${reason}\nComplément :\n\`\`\`${explication}\`\`\``);
}