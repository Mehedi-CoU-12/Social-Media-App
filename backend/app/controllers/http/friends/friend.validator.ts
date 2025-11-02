import vine from '@vinejs/vine'

export const listFriendsSchema = vine.compile(
  vine.object({
    userId: vine.number().positive(),
  })
)

export const sendFriendRequestSchema = vine.compile(
  vine.object({
    senderId: vine.number().positive(),
    receiverId: vine.number().positive(),
  })
)

export const respondFriendRequestSchema = vine.compile(
  vine.object({
    requestId: vine.number().positive(),
    action: vine.enum(['accept', 'decline']),
  })
)

export const listFriendRequestsSchema = vine.compile(
  vine.object({
    userId: vine.number().positive(),
  })
)
