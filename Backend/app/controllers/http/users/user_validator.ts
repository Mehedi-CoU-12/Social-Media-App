import vine from '@vinejs/vine'

export const getAllUsersQuerySchema = vine.compile(
  vine.object({
    page: vine
      .number()
      .positive()
      .min(1)
      .optional()
      .transform((value) => value || 1),

    limit: vine
      .number()
      .positive()
      .min(1)
      .max(100)
      .optional()
      .transform((value) => value || 10),

    sort: vine
      .enum(['name', 'email', 'created_at', 'updated_at'])
      .optional()
      .transform((value) => value || 'created_at'),

    order: vine
      .enum(['asc', 'desc'])
      .optional()
      .transform((value) => value || 'desc'),
    search: vine
      .string()
      .maxLength(100)
      .optional()
      .transform((value) => value?.trim() || undefined),
    status: vine
      .enum(['active', 'inactive', 'all'])
      .optional()
      .transform((value) => value || 'all'),
  })
)

export const signupSchema = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const userIdParamSchema = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)

export const loginSchema = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const forgetPasswordSchema = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)

export const resetPasswordSchema = vine.compile(
  vine.object({
    token: vine.string(),
    password: vine.string().minLength(6),
  })
)

export const updateUserSchema = vine.compile(
  vine.object({
    password: vine.string().minLength(6).optional(),
  })
)
