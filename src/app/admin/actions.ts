"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function assertAdmin() {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");
  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
  const entry = await prisma.adminAllowlist.findUnique({ where: { email } });
  if (!entry || entry.status === "suspended") throw new Error("Forbidden");
  if (entry.status === "temporary" && entry.expiresAt && entry.expiresAt < new Date())
    throw new Error("Forbidden");
}

export async function addAdminEmail(formData: FormData) {
  await assertAdmin();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const label = (formData.get("label") as string)?.trim() || null;
  if (!email) throw new Error("Email required");
  await prisma.adminAllowlist.upsert({
    where: { email },
    update: { status: "active", expiresAt: null, label },
    create: { email, label, status: "active" },
  });
  revalidatePath("/admin");
}

export async function suspendAdminEmail(id: string) {
  await assertAdmin();
  await prisma.adminAllowlist.update({ where: { id }, data: { status: "suspended" } });
  revalidatePath("/admin");
}

export async function activateAdminEmail(id: string) {
  await assertAdmin();
  await prisma.adminAllowlist.update({ where: { id }, data: { status: "active", expiresAt: null } });
  revalidatePath("/admin");
}

export async function grantTemporaryAccess(id: string, hours: number) {
  await assertAdmin();
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
  await prisma.adminAllowlist.update({
    where: { id },
    data: { status: "temporary", expiresAt },
  });
  revalidatePath("/admin");
}

export async function removeAdminEmail(id: string) {
  await assertAdmin();
  await prisma.adminAllowlist.delete({ where: { id } });
  revalidatePath("/admin");
}
