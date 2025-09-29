import vine from '@vinejs/vine'
export const signupSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(50),
    email: vine.string().email(),
    password: vine.string().minLength(6),
    profilePicture: vine
      //   .file({
      //     size: '10mb',
      //     extnames: ['jpg', 'png', 'jpeg', 'webp'],
      //   })
      .string()
      .optional(),
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
    name: vine.string().minLength(3).maxLength(6).optional(),
    profilePicture: vine
      //   .file({
      //     size: '10mb',
      //     extnames: ['jpg', 'png', 'jpeg', 'webp'],
      //   })
      .string()
      .optional(),
  })
)
