import Profile from '#models/profile'
import User from '#models/user'

export default class UsersQuery {
  public async getAllUsers(queryParams: {
    page?: number
    limit?: number
    sort?: 'email' | 'name' | 'created_at' | 'updated_at'
    order?: 'asc' | 'desc'
    search?: string
    status?: 'active' | 'inactive' | 'all'
  }) {
    return await User.query().paginate(queryParams.page || 1, queryParams.limit || 10)
  }

  public async getUserById(id: number) {
    return await User.query().where('id', id).first()
  }

  public async getUserByEmail(email: string) {
    return await User.query().where('email', email).first()
  }

  public async createUser(
    userInfo: {
      email: string
      password: string
    },
    profileInfo: { fullName: string; username: string }
  ) {
    //create user
    const user = await User.create(userInfo)
    //create profile
    await user.related('profile').create(profileInfo)

    return { message: 'User and Profile are created successfully' }
  }

  public async updateUser(
    id: number,
    updates: { email?: string; password?: string; profilePicture?: string }
  ) {
    const user = await User.find(id)
    if (user) {
      user.merge(updates)
      await user.save()
    }
    return user
  }

  public async deleteUser(id: number) {
    const user = await User.find(id)
    if (user) {
      await user.delete()
      return { message: 'User deleted successfully' }
    }
    return { message: 'User not found' }
  }
}
