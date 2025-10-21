import { v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET ,
})

export const uploadFilesOnCloudinary = async (files: any[]) => {
  try {
    if (!files || files.length === 0) return null

    //upload files one by one
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: 'social_media_app',
      })
    )

    const uploadResults = await Promise.all(uploadPromises)

    // Clean up local files after upload
    files.forEach((file) => {
      fs.unlinkSync(file.path)
    })

    return uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }))
  } catch (error) {
    fs.unlinkSync(files[0].path)
    return null
  }
}
