import Friendship from '#models/friend'

export default class FriendQuery {
  // List friends for a given user ID
  public async listFriends(userId: number) {
    const friendships = await Friendship.query()
      .where('status', 'accepted')
      .where((query) => {
        query.where('requester_id', userId).orWhere('receiver_id', userId)
      })
      .preload('requester', (requesterQuery) => {
        requesterQuery
          .select('id')
          .preload('profile', (profileQuery) =>
            profileQuery.select('display_name', 'username', 'profile_picture_url')
          )
      })
      .preload('receiver', (receiverQuery) => {
        receiverQuery
          .select('id')
          .preload('profile', (profileQuery) =>
            profileQuery.select('display_name', 'username', 'profile_picture_url')
          )
      })

    //Return only the "other" user as the friend
    return friendships.map((f) =>
      f.requesterId === userId ? f.receiver.profile : f.requester.profile
    )
  }

  public async sendFriendRequest(requesterId: number, receiverId: number) {
    const options = {
      receiverId,
      requesterId,
      status: 'pending',
    }

    return await Friendship.create(options)
  }

  public async getFriendRequestBetweenUsers(requesterId: number, receiverId: number) {
    return await Friendship.query()
      .where((query) => {
        query
          .where('requester_id', requesterId)
          .andWhere('receiver_id', receiverId)
          .orWhere('requester_id', receiverId)
          .andWhere('receiver_id', requesterId)
      })
      .first()
  }

  public async updateFriendRequestStatus(
    friendRequestId: number,
    status: 'accepted' | 'rejected' | 'pending'
  ) {
    const friendRequest = await Friendship.findOrFail(friendRequestId)
    friendRequest.status = status
    await friendRequest.save()
    return friendRequest
  }

  public async listFriendRequests(userId: number) {
    return await Friendship.query().where('receiver_id', userId).andWhere('status', 'pending')
  }

  public async listSentRequests(userId: number) {
    return await Friendship.query().where('requester_id', userId).andWhere('status', 'pending')
  }
}
