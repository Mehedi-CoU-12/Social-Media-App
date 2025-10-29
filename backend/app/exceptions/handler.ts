import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
import { errors as authErrors } from '@adonisjs/auth'
import { errors as vineErrors } from '@vinejs/vine'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { view }) => {
      return view.render('pages/errors/not_found', { error })
    },
    '500..599': (error, { view }) => {
      return view.render('pages/errors/server_error', { error })
    },
  }

  /**
   * Normalize error payload for API responses
   */
  private apiError(
    ctx: HttpContext,
    status: number,
    message: string,
    extra?: Record<string, unknown>
  ) {
    return ctx.response.status(status).json({
      success: false,
      message,
      path: ctx.request.url(),
      code: (extra as any)?.code ?? undefined,
      errors: (extra as any)?.errors ?? undefined,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const isApi = ctx.request.url().startsWith('/api/')

    // Authentication errors
    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      if (isApi) {
        return this.apiError(ctx, 401, 'Authentication required to access this resource', {
          code: 'AUTH_001',
        })
      }
    }

    // Invalid credentials (thrown by auth.attempt)
    if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
      if (isApi) {
        return this.apiError(ctx, 401, 'Invalid email or password', {
          code: 'AUTH_INVALID_CREDENTIALS',
        })
      }
    }

    // Vine validation errors (422)
    if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      if (isApi) {
        // The reporter usually formats errors as an array at error.messages or error.messages.errors
        const anyErr = error as any
        const errorsList = anyErr?.messages?.errors ?? anyErr?.messages ?? []
        return this.apiError(ctx, 422, 'Validation failed', {
          code: 'VAL_001',
          errors: errorsList,
        })
      }
    }

    // CSRF token errors (Shield)
    if ((error as any)?.code === 'E_INVALID_CSRF_TOKEN') {
      if (isApi) {
        return this.apiError(ctx, 403, 'Invalid CSRF token', { code: 'CSRF_001' })
      }
    }

    // Database connectivity issues (MySQL/XAMPP not running or unreachable)
    {
      const anyErr = error as any
      const code = anyErr?.code ?? anyErr?.original?.code
      const codeStr = typeof code === 'string' ? code : ''
      const msg = String(anyErr?.message ?? '')
      const mysqlLikeCodes = new Set([
        'ECONNREFUSED',
        'ER_ACCESS_DENIED_ERROR',
        'ER_DBACCESS_DENIED_ERROR',
        'ER_BAD_DB_ERROR',
        'PROTOCOL_CONNECTION_LOST',
        'ETIMEDOUT',
        'ENOTFOUND',
        'EHOSTUNREACH',
      ])

      const looksLikeDbConnectionIssue =
        (codeStr && (mysqlLikeCodes.has(codeStr) || /^E_.*DB/i.test(codeStr))) ||
        /connect ECONNREFUSED|Connection lost|Knex: Timeout acquiring a connection|getaddrinfo ENOTFOUND|connect ETIMEDOUT/i.test(
          msg
        )

      if (looksLikeDbConnectionIssue) {
        if (isApi) {
          return this.apiError(
            ctx,
            503,
            'Database is not reachable. Please ensure MySQL/XAMPP is running and database credentials are correct.',
            { code: 'DB_CONN_001' }
          )
        }
      }
    }

    // Not found (route or resource)
    if ((error as any)?.code === 'E_ROUTE_NOT_FOUND') {
      if (isApi) {
        return this.apiError(ctx, 404, 'Route not found', { code: 'ROUTE_404' })
      }
    }

    // Generic: any error that defines a status/message for API routes
    if (isApi) {
      const anyErr = error as any
      if (typeof anyErr?.status === 'number' && typeof anyErr?.message === 'string') {
        return this.apiError(ctx, anyErr.status, anyErr.message, {
          code: anyErr.code ?? 'UNKNOWN_ERROR',
        })
      }
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
