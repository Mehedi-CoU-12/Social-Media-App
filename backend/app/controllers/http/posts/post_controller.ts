import { HttpContext } from '@adonisjs/core/http'
import PostService from './post_service.js'
export default class PostController {
  private service = new PostService()

  constructor() {
    this.service = new PostService()
  }

  public async getAllPosts(ctx: HttpContext) {
    try {
      console.log('-------getAllPosts called------');
      const posts = await this.service.getAllPosts()
      return ctx.response.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        data: posts
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        message: 'Failed to retrieve posts',
        error: error.message
      })
    }
  }

  public async getUserAllPosts(ctx: HttpContext) {
    try {
      const id = Number(ctx.params.id)
      const posts = await this.service.getUserAllPosts(id)
      return ctx.response.status(200).json({
        success: true,
        message: 'User posts retrieved successfully',
        data: posts
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        message: 'Failed to retrieve user posts',
        error: error.message
      })
    }
  }

  public async createPost(ctx:HttpContext){
    const body=ctx.request.all();
    console.log('-------body------',body);
  }

  private async uploadFilesOnCloudinary(files: any[]) {}
}
