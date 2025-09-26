import { HttpContext } from '@adonisjs/core/http'
import PostService from './service.js'
export default class PostController {
  private service = new PostService()

  constructor() {
    this.service = new PostService()
  }

  public async getUserAllPosts(ctx: HttpContext) {
    const id = Number(ctx.params.id)
    return await this.service.getUserAllPosts(id)
  }
}
