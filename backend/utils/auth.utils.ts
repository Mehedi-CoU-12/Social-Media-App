import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthUtils {
  public async ensureOwner(ctx: HttpContext, userId: number | string) {
    await ctx.auth.authenticate()

    if (ctx.auth.user!.id !== Number(userId))
      throw new Exception('Forbidden: You are not the owner of this resource')
  }
}
