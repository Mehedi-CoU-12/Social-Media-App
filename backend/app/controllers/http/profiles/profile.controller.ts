import { HttpContext } from '@adonisjs/core/http'
import ProfileService from './profile.service.js'
import { deleteProfileSchema, getProfileSchema, updateProfileSchema } from './profile.validator.js'
import AuthUtils from '../../../../utils/auth.utils.js'

export default class ProfileController {
  private service: ProfileService
  private AuthUtils: AuthUtils

  constructor() {
    this.service = new ProfileService()
    this.AuthUtils = new AuthUtils()
  }

  public async getProfile(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(getProfileSchema, { data: ctx.params })
    await this.AuthUtils.ensureOwner(ctx, payload.id)
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
