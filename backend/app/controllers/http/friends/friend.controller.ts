import { HttpContext } from '@adonisjs/core/http'
import { listFriendsSchema } from './friend.validator.js'
import FriendService from './friend.service.js'
export default class FriendController {

  constructor(private friendService: FriendService) {}

  public async sendFriendRequest(ctx: HttpContext) {
    // Logic to send a friend request
    // const { senderId, receiverId } = ctx.request.body()
    // Assume we have a FriendRequest model to handle database operations
    // await FriendRequest.create({ senderId, receiverId, status: 'pending' })
    // return response.status(200).json({ message: 'Friend request sent successfully' })
  }

  public async acceptFriendRequest(ctx: HttpContext) {
    // Logic to accept a friend request
  }

  public async declineFriendRequest(ctx: HttpContext) {
    // Logic to decline a friend request
  }

  public async listFriends(ctx: HttpContext) {
    // Logic to list friends of a user
    const payload =await ctx.request.validateUsing(listFriendsSchema, { data: ctx.params })
    const friends=this.friendService.listFriends(payload)
    return ctx.response.status(200).json({ message: `Listing friends for user ${payload}` })
  }

  public async listFriendRequests(ctx: HttpContext) {
    // Logic to list friend requests for a user
  }
}
