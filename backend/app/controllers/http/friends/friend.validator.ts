import vine from '@vinejs/vine'

export const listFriendsSchema = vine.compile(
  vine.object({
    userId: vine.string(),
  })
)

export const FriendRequestSchema = vine.compile(
  vine.object({
    requesterId: vine.number().positive(),
    receiverId: vine.number().positive(),
  })
)

export const respondFriendRequestSchema = vine.compile(
  vine.object({
    requesterId: vine.number().positive(),
    action: vine.enum(['accepted', 'rejected', 'pending']),
  })
)

export const listFriendRequestsSchema = vine.compile(
  vine.object({
    userId: vine.number().positive(),
  })
)
