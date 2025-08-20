import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('my_file') as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const b64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${b64}`;

    const cldRes = await handleUpload(dataURI);
    
    return NextResponse.json(cldRes);
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}