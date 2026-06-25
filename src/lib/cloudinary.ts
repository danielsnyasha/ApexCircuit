import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadToCloudinary(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<{ url: string; publicId: string; resourceType: string }> {
  const isImage = mimeType.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "apex-circuit/enquiries",
        resource_type: resourceType,
        public_id: `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
        use_filename: false,
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
        });
      }
    );
    uploadStream.end(buffer);
  });
}
