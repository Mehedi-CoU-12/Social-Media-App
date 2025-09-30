import { HttpContext } from '@adonisjs/core/http'
import ProfileService from './profile_service.js'

export default class profileController {
  private service: ProfileService

  constructor() {
    this.service = new ProfileService()
  }

  public async showProfile(ctx: HttpContext) {}

  public async createProfile(ctx: HttpContext) {
    const data = ctx.request.body()
    return await this.service.createProfile(data)
  }
}
