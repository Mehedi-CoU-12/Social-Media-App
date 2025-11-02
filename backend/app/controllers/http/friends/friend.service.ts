import { inject } from '@adonisjs/core'
import FriendQuery from './friend.query.js'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class FriendService {
  constructor(private friendQuery: FriendQuery) {}

  public async listFriends(payload: { userId: number }) {
    return await this.friendQuery.listFriends(payload.userId)
  }

  public async sendFriendRequest(payload: { requesterId: number; receiverId: number }) {
    const { receiverId, requesterId } = payload

    if (receiverId === requesterId) throw new Exception('you can not sent yourself friend request')

    const existingRequest = await this.friendQuery.getFriendRequestBetweenUsers(
      requesterId,
      receiverId
    )

    if (existingRequest) {
      if (existingRequest.status === 'accepted') throw new Exception('you are already friend')

      if (existingRequest.status === 'pending')
        throw new Exception('you already sent friend request!')

      if (existingRequest.status === 'rejected')
        return await this.friendQuery.updateFriendRequestStatus(existingRequest.id, 'pending')
    }

    return await this.friendQuery.sendFriendRequest(requesterId, receiverId)
  }

  public async acceptFriendRequest(payload: { requesterId: number; receiverId: number }) {
    const { receiverId, requesterId } = payload

    if (receiverId === requesterId) throw new Exception('invalid friend request')

    const existingRequest = await this.friendQuery.getFriendRequestBetweenUsers(
      requesterId,
      receiverId
    )

    if (existingRequest) {
      if (existingRequest.status === 'accepted') throw new Exception('you are already friend')

      if (existingRequest.status === 'rejected') throw new Exception('your request unsent')

      if (existingRequest.status === 'pending')
        return await this.friendQuery.updateFriendRequestStatus(existingRequest.id, 'accepted')
    }
  }

  public async rejectFriendRequest(payload: { requesterId: number; receiverId: number }) {
    const { receiverId, requesterId } = payload

    if (receiverId === requesterId) throw new Exception('invalid friend request')
    const existingRequest = await this.friendQuery.getFriendRequestBetweenUsers(
      requesterId,
      receiverId
    )

    if (existingRequest) {
      if (existingRequest.status === 'accepted') throw new Exception('you are already friend')

      if (existingRequest.status === 'rejected') throw new Exception('alredy rejected')

      if (existingRequest.status === 'pending')
        return await this.friendQuery.updateFriendRequestStatus(existingRequest.id, 'rejected')
    }
  }

  public async listFriendRequests(userId: number) {
    return this.friendQuery.listFriendRequests(userId)
  }

  public async listSentRequests(userId: number) {
    return this.friendQuery.listSentRequests(userId)
  }
}
