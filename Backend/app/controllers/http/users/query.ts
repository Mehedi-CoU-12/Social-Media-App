import User from '#models/user'

export default class UsersQuery {
  public async getAllUsers() {
    return await User.query()
  }
}
