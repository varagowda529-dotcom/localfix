import { eq } from "drizzle-orm";
import { db } from "@/db";
import { photos } from "@/db/schema";

export const dynamic = "force-dynamic";

/** Serve user-uploaded problem photos stored in the database. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const rows = await db.select().from(photos).where(eq(photos.id, id)).limit(1);
  const photo = rows[0];
  if (!photo) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": photo.contentType,
      "Content-Length": String(photo.data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
