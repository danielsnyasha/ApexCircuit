import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let firstName = "", lastName = "", email = "", phone = "", company = "";
    let service = "", budget = "", timeline = "", companySize = "", description = "";
    let newsletter = false;
    const attachments: {
      url: string;
      publicId: string;
      fileName: string;
      fileType: string;
      resourceType: string;
    }[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      firstName   = (formData.get("firstName") as string) ?? "";
      lastName    = (formData.get("lastName") as string) ?? "";
      email       = (formData.get("email") as string) ?? "";
      phone       = (formData.get("phone") as string) ?? "";
      company     = (formData.get("company") as string) ?? "";
      service     = (formData.get("service") as string) ?? "";
      budget      = (formData.get("budget") as string) ?? "";
      timeline    = (formData.get("timeline") as string) ?? "";
      companySize = (formData.get("companySize") as string) ?? "";
      description = (formData.get("description") as string) ?? "";
      newsletter  = formData.get("newsletter") === "true";

      const fileEntries = formData.getAll("attachments") as File[];
      for (const file of fileEntries) {
        if (!file || typeof file === "string") continue;
        if (file.size === 0) continue;
        if (file.size > MAX_FILE_SIZE) continue;
        if (!ALLOWED_TYPES.includes(file.type)) continue;

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToCloudinary(buffer, file.name, file.type);
        attachments.push({
          url: result.url,
          publicId: result.publicId,
          fileName: file.name,
          fileType: file.type,
          resourceType: result.resourceType,
        });
      }
    } else {
      const body = await req.json();
      ({ firstName, lastName, email, phone, company, service, budget, timeline, companySize, description } = body);
      newsletter = !!body.newsletter;
    }

    if (!firstName || !lastName || !email || !service || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        company: company || null,
        service,
        budget: budget || null,
        timeline: timeline || null,
        companySize: companySize || null,
        description,
        newsletter,
        attachments: attachments.length > 0 ? attachments : undefined,
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/enquiries]", err);
    return NextResponse.json({ error: "Failed to save enquiry." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enquiries);
  } catch (err) {
    console.error("[GET /api/enquiries]", err);
    return NextResponse.json({ error: "Failed to fetch enquiries." }, { status: 500 });
  }
}
