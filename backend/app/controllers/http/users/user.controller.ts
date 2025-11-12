import type { HttpContext } from '@adonisjs/core/http'
import UserService from './user.service.js'
import {
  getAllUsersQuerySchema,
  loginSchema,
  signupSchema,
  updateUserSchema,
  userIdParamSchema,
} from './user.validator.js'
import AuthUtils from '../../../../utils/auth.utils.js'

export default class UsersController {
  private service = new UserService()
  private AuthUtils = new AuthUtils()
  constructor() {
    this.service = new UserService()
    this.AuthUtils = new AuthUtils()
  }
  public async getAllUsers(ctx: HttpContext) {
    const queryParams = await ctx.request.validateUsing(getAllUsersQuerySchema)
    return await this.service.getAllUsers(queryParams)
  }

  public async getIndividualUser(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(userIdParamSchema, { data: ctx.params })
    await this.AuthUtils.ensureOwner(ctx, ctx.params.id)
    return await this.service.getIndividualUser(payload)
  }

  public async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(loginSchema)
    await this.service.login(payload, ctx.auth)
    return { message: 'user log in successfully!', data: ctx.auth.user }
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

  public async updateUser(ctx: HttpContext) {
    const { id } = await ctx.request.validateUsing(userIdParamSchema, { data: ctx.params })
    const payload = await ctx.request.validateUsing(updateUserSchema)
    await this.AuthUtils.ensureOwner(ctx, id)

    return await this.service.updateUser(id, payload)
  }

  public async deleteUser(ctx: HttpContext) {
    const { id } = await ctx.request.validateUsing(userIdParamSchema)
    await this.AuthUtils.ensureOwner(ctx, id)
    return await this.service.deleteUser(id)
  }
}
