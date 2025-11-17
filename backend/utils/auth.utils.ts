import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthUtils {
  public async authenticated(ctx: HttpContext) {
    await ctx.auth.authenticate()

    // if (ctx.auth.user!.id !== Number(userId))
    //   throw new Exception('Forbidden: You are not the owner of this resource')
    if (!ctx.auth.user) throw new Exception('Unauthorized: No authenticated user found')
  }

  public async ensureOwner(ctx: HttpContext, userId: number | string) {
    await this.authenticated(ctx)

    if (ctx.auth.user!.id !== Number(userId))
      throw new Exception('Forbidden: You are not the owner of this resource')
  }
}
