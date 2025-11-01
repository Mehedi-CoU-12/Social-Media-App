export default class FriendService {
    public async listFriends(payload: { userId: string }) {
        // Logic to retrieve friends from the database
        // For example:
        // return await FriendModel.query().where('user_id', userId)
    }
}