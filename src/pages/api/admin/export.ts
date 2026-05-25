import type { APIRoute } from "astro";
import { isAuthenticated } from "@lib/auth";
import { getAdminClient } from "@lib/supabase";

export const prerender = false;

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => csvEscape(r[h])).join(","));
  }
  return lines.join("\n");
}

export const GET: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const type = new URL(request.url).searchParams.get("type") ?? "participants";
  const allowed = new Set(["participants", "waitlist", "newsletter"]);
  if (!allowed.has(type)) {
    return new Response("Invalid type", { status: 400 });
  }
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from(type)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    const csv = toCSV((data as Record<string, unknown>[]) ?? []);
    const filename = `${type}-${new Date().toISOString().slice(0, 10)}.csv`;
    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return new Response(
      err instanceof Error ? err.message : "DB error",
      { status: 500 },
    );
  }
};
