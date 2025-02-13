import { formatBytes } from "@/utils/format-bytes";
import { S3 } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import { discordLog } from "../(utils)/actions";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("code") !== process.env.S3_WEBHOOK_CODE) return Response.json({ message: "Invalid code" }, { status: 403 });
  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.S3_KEY!,
      secretAccessKey: process.env.S3_SECRET!,
    },
    region: process.env.S3_REGION!,
    endpoint: process.env.S3_ENDPOINT!,
    tls: true,
  });

  // get the size of the bucket
  const { Contents } = await s3.listObjectsV2({
    Bucket: process.env.S3_BUCKET!,
  });

  const fileSizes = Contents?.reduce((acc, file) => acc + file.Size!, 0);

  await discordLog("S3 bucket size: " + formatBytes(fileSizes!) + " (" + fileSizes + " bytes)");
  // just return
  return Response.json({ message: "ok" });
}
