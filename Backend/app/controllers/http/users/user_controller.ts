import type { HttpContext } from '@adonisjs/core/http'
import UserService from './user_service.js'
import { loginSchema, signupSchema, userIdParamSchema } from './user_validator.js'

export default class UsersController {
  private service = new UserService()
  constructor() {
    this.service = new UserService()
  }
  public async getAllUsers() {
    return await this.service.getAllUsers()
  }

  public async getIndividualUser(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(userIdParamSchema, { data: ctx.params })
    return await this.service.getIndividualUser(payload)
  }

  public async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(loginSchema)
    return await this.service.login(payload, ctx.auth)
  }

  public async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    return { message: 'log out successfully!' }
  }

  public async createUser(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(signupSchema)
    return await this.service.createUser(payload)
  }

  public async forgetPassword({ request, response }: HttpContext) {
    const { email } = request.body()
    return await this.service.forgetPassword(email)
  }

  public async resetPassword({ request, response }: HttpContext) {
    const { token, newPassword } = request.body()
    return await this.service.resetPassword(token, newPassword)
  }

  public async updateUser({ params, request, response }: HttpContext) {
    const { id } = params
    const { username, email, password, profilePicture } = request.body()
    return await this.service.updateUser(id, { username, email, password, profilePicture })
  }

  public async deleteUser({ params, response }: HttpContext) {
    const { id } = params
    return await this.service.deleteUser(id)
  }
}
