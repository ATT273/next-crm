import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinata-config";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { files } = await req.json();
  // If you're going to use auth you'll want to verify here
  try {
    const urls = await Promise.all(
      files.map(async (file: { name: string }) => {
        return pinata.upload.public.createSignedURL({
          expires: 60 * 3, // 3 minutes
          name: file.name,
        });
      })
    );
    return NextResponse.json({ urls }, { status: 200 }); // Returns the signed upload URL
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
  }
}
