import { HttpContext } from '@adonisjs/core/http'
import PostService from './post.service.js'
export default class PostController {
  private service = new PostService()

  constructor() {
    this.service = new PostService()
  }

  public async getAllPosts(ctx: HttpContext) {
    try {
      const posts = await this.service.getAllPosts()
      return ctx.response.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        data: posts,
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        message: 'Failed to retrieve posts',
        error: error.message,
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
        data: posts,
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        message: 'Failed to retrieve user posts',
        error: error.message,
      })
    }
  }

  public async getSinglePost(ctx: HttpContext) {
    // Implementation for getting a single post
  }

  public async createPost(ctx: HttpContext) {
    const text = ctx.request.input('text')
    const files = ctx.request.files('files', { size: '50mb' })
    const post = await this.service.createPost(text, files)

    return ctx.response.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    })
  }

  public async updatePost(ctx: HttpContext) {
    // Implementation for updating a post
  }

  public async deletePost(ctx: HttpContext) {
    // Implementation for deleting a post
  }
}
