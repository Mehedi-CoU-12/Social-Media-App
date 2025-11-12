import { v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
})

export type UploadedFile = { url: string | null; type: string | null }[]

export const uploadFilesOnCloudinary = async (files: any[]) => {
  try {
    if (!files || files.length === 0) return null

    const uploadResults: UploadedFile = []

    //upload files one by one
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.tmpPath!, {
        folder: 'posts',
        resource_type: 'auto', // handles both images & videos
      })
      uploadResults.push({
        url: result.secure_url,
        type: result.resource_type,
      })

      // ✅ Safely remove temp file (only if exists)
      if (file.tmpPath && fs.existsSync(file.tmpPath)) {
        fs.unlinkSync(file.tmpPath)
      }
    }

    return uploadResults
  } catch (error) {
    console.error('Error uploading files to Cloudinary:', error)
    // Cleanup temp files in case of error
    for (const file of files) {
      if (file.tmpPath && fs.existsSync(file.tmpPath)) {
        fs.unlinkSync(file.tmpPath)
      }
    }
    return null
  }
}
