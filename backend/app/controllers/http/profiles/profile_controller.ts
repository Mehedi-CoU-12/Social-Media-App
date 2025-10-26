import { HttpContext } from '@adonisjs/core/http'
import ProfileService from './profile_service.js'

export default class ProfileController {
  private service: ProfileService

  constructor() {
    this.service = new ProfileService()
  }

  public async getProfile(ctx: HttpContext) {
    const { id } = ctx.params
    return await this.service.getProfile(id)
  }

  public async createProfile(ctx: HttpContext) {
    const data = ctx.request.body()
    return await this.service.createProfile(data)
  }
}
