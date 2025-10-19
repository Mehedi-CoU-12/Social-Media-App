import { HttpContext } from '@adonisjs/core/http'
import PostService from './post_service.js'
export default class PostController {
  private service = new PostService()

  constructor() {
    this.service = new PostService()
  }

  public async getUserAllPosts(ctx: HttpContext) {
    const id = Number(ctx.params.id)
    return await this.service.getUserAllPosts(id)
  }

  private async uploadFilesOnCloudinary(files: any[]) {}
}
