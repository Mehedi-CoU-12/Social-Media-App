import { HttpContext } from '@adonisjs/core/http'
import {
  FriendRequestSchema,
  listFriendRequestsSchema,
  listFriendsSchema,
} from './friend.validator.js'
import FriendService from './friend.service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class FriendController {
  constructor(private friendService: FriendService) {}

  public async sendFriendRequest(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(FriendRequestSchema)
    const friendRequest = await this.friendService.sendFriendRequest(payload)
    return ctx.response.status(200).json({ message: 'Friend request sent', data: friendRequest })
  }

  public async acceptFriendRequest(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(FriendRequestSchema)
    await this.friendService.acceptFriendRequest(payload)
    return ctx.response.status(200).json({ message: 'Friend request accepted!' })
  }

  public async declineFriendRequest(ctx: HttpContext) {
    // Logic to decline a friend request
  }

  public async listFriends(ctx: HttpContext) {
    // Logic to list friends of a user
    const payload = await ctx.request.validateUsing(listFriendsSchema, { data: ctx.params })
    const friends = await this.friendService.listFriends({ userId: 1 })

    return ctx.response.status(200).json({ data: friends, message: `all friend are fetched!` })
  }

  public async listFriendRequests(ctx: HttpContext) {
    // Logic to list friend requests for a user
    const payload = await ctx.request.validateUsing(listFriendRequestsSchema, { data: ctx.params })
    const friendRequests = await this.friendService.listFriendRequests(payload.userId)
    return ctx.response.status(200).json({ data: friendRequests })
  }

  public async listSentRequests(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(listFriendRequestsSchema, { data: ctx.params })
    const sentList = await this.friendService.listSentRequests(payload.userId)
    return ctx.response.status(200).json({ data: sentList })
  }
}
