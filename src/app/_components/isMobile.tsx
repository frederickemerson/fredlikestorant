"use server"

import { userAgent } from "next/server";

export async function IsMobile() {
 const { device } = userAgent({ headers: headers() });
 return device?.type === "mobile" ? "mobile" : "desktop";
}