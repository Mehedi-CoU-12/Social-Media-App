import { HttpContext } from '@adonisjs/core/http'
import ProfileService from './profile.service.js'
import { deleteProfileSchema, getProfileSchema, updateProfileSchema } from './profile.validator.js'

export default class ProfileController {
  private service: ProfileService

  constructor() {
    this.service = new ProfileService()
  }

  public async getProfile(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(getProfileSchema, { data: ctx.params })
    return await this.service.getProfile(payload)
  }

  public async createProfile(ctx: HttpContext) {
    const data = ctx.request.body()
    return await this.service.createProfile(data)
  }

  public async updateProfile(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(updateProfileSchema, { data: ctx.params })
    const updates = await this.service.updateProfile(payload)
    return ctx.response.status(200).json({ message: 'Profile updated successfully', data: updates })
  }

  public async deleteProfile(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(deleteProfileSchema, { data: ctx.params })
    await this.service.deleteProfile(payload)
    return ctx.response.status(200).json({ message: 'Profile deleted successfully' })
  }
}
