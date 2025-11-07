import vine from '@vinejs/vine'

export const getProfileSchema = vine.compile(
  vine.object({
    id: vine.string().transform((value) => {
      const num = Number(value)
      return !Number.isNaN(num) ? num : value
    }),
  })
)

export const createProfileSchema = vine.compile(
  vine.object({
    userId: vine.number(),
    displayName: vine.string().minLength(3).maxLength(50),
    username: vine.string().minLength(3).maxLength(30).optional(),
    bio: vine.string().maxLength(160).optional(),
    profilePictureUrl: vine.string().url().optional(),
    coverPhotoUrl: vine.string().url().optional(),
    phoneNumber: vine.string().maxLength(15).optional(),
    location: vine.string().maxLength(100).optional(),
    websiteUrl: vine.string().url().optional(),
    dateOfBirth: vine.date().optional(),
    gender: vine.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
    isPrivate: vine.boolean().optional(),
    showEmail: vine.boolean().optional(),
    showPhone: vine.boolean().optional(),
    followersCount: vine.number().optional(),
    followingCount: vine.number().optional(),
    postsCount: vine.number().optional(),
    socailLinks: vine
      .object({
        facebook: vine.string().url().optional(),
        twitter: vine.string().url().optional(),
        instagram: vine.string().url().optional(),
        linkedin: vine.string().url().optional(),
        youtube: vine.string().url().optional(),
      })
      .optional(),
    interests: vine.string().optional(),
  })
)

export const updateProfileSchema = vine.compile(
  vine.object({
    id: vine.string().transform((value) => {
      const num = Number(value)
      return !Number.isNaN(num) ? num : value
    }),
    displayName: vine.string().minLength(3).maxLength(50).optional(),
    username: vine.string().minLength(3).maxLength(30).optional(),
    bio: vine.string().maxLength(160).optional(),
    profilePictureUrl: vine.string().url().optional(),
    coverPhotoUrl: vine.string().url().optional(),
    phoneNumber: vine.string().maxLength(15).optional(),
    location: vine.string().maxLength(100).optional(),
    websiteUrl: vine.string().url().optional(),
    dateOfBirth: vine.date().optional(),
    gender: vine.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
    isPrivate: vine.boolean().optional(),
    showEmail: vine.boolean().optional(),
    showPhone: vine.boolean().optional(),
    followersCount: vine.number().optional(),
    followingCount: vine.number().optional(),
    postsCount: vine.number().optional(),
    socailLinks: vine
      .object({
        facebook: vine.string().url().optional(),
        twitter: vine.string().url().optional(),
        instagram: vine.string().url().optional(),
        linkedin: vine.string().url().optional(),
        youtube: vine.string().url().optional(),
      })
      .optional(),
    interests: vine.string().optional(),
  })
)

export const deleteProfileSchema = vine.compile(
  vine.object({
    id: vine.string().transform((value) => {
      const num = Number(value)
      return !Number.isNaN(num) ? num : value
    }),
  })
)
