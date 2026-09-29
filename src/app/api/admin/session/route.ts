import { NextRequest, NextResponse } from "next/server";
import { adminConfigured, isAdminRequest } from "@/lib/admin-auth";
import { storageMode } from "@/lib/vetrina-store";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    ok: isAdminRequest(req),
    configured: adminConfigured(),
    storage: storageMode(),
  });
}
