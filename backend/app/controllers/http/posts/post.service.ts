import Profile from '#models/profile'
import { uploadFilesOnCloudinary } from '../../../../utils/cloudinary.js'
import PostQuery from './post.query.js'

export default class PostService {
  private Query = new PostQuery()
  constructor() {
    this.Query = new PostQuery()
  }

  public async getAllPosts() {
    return await this.Query.getAllPosts()
  }

  public async getUserAllPosts(id: number | string) {
    const profile = await Profile.query()
      .where('username', id)
      .orWhere('id', Number(id))
      .select('user_id', 'display_name', 'username', 'profile_picture_url')
      .first()
    if (!profile) {
      throw new Error('Profile not found')
    }

    return await this.Query.getUserAllPosts(profile)
  }

  private async uploadFiles(files: any[]) {
    const uploadedFiles: any = await uploadFilesOnCloudinary(files)
    let imageUrl = null
    let videoUrl = null

    if (uploadedFiles) {
      for (const file of uploadedFiles) {
        if (file.type === 'image') imageUrl = file.url
        if (file.type === 'video') videoUrl = file.url
      }
    }

    return { imageUrl, videoUrl }
  }

  public async createPost(text: string, files: any[]) {
    const { imageUrl, videoUrl } = await this.uploadFiles(files)

    if (!text && !imageUrl && !videoUrl) {
      throw new Error('Post content cannot be empty')
    }

    const body = {
      user_id: 1,
      content: text,
      imageUrl,
      videoUrl,
    }

    return await this.Query.createPost(body)
  }
}
