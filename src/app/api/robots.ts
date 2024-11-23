import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "public", "robots.txt");
  const fileContents = await fs.readFile(filePath, "utf8");

  res.setHeader("Content-Type", "text/plain");
  res.write(fileContents);
  res.end();
}
