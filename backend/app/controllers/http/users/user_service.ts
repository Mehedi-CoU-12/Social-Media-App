import { Exception } from '@adonisjs/core/exceptions'
import UsersQuery from './user_query.js'
import hash from '@adonisjs/core/services/hash'

export default class UsersService {
  private Query: UsersQuery

  constructor() {
    this.Query = new UsersQuery()
  }

  public async getAllUsers(queryParams: {
    page?: number
    limit?: number
    sort?: 'email' | 'name' | 'created_at' | 'updated_at'
    order?: 'asc' | 'desc'
    search?: string
    status?: 'active' | 'inactive' | 'all'
  }) {
    return await this.Query.getAllUsers(queryParams)
  }

  public async getIndividualUser(payload: { id: number }) {
    return await this.Query.getUserById(payload.id)
  }

  public async login(user: { email: string; password: string }, auth: any) {
    const { email, password } = user

    // 1) Check if user exists
    const existingUser = await this.Query.getUserByEmail(email)
    if (!existingUser) {
      throw new Exception('Invalid email or password', {
        status: 401,
        code: 'AUTH_INVALID_CREDENTIALS',
      })
    }

    // 2) Verify password using the configured hasher
    const isValid = await (hash as any).verify(existingUser.password, password)
    if (!isValid) {
      throw new Exception('Invalid email or password', {
        status: 401,
        code: 'AUTH_INVALID_CREDENTIALS',
      })
    }

    // 3) Start session
    await auth.use('web').login(existingUser)

    return { message: 'user login successfully!' }
  }

  public async createUser(payload: {
    fullName: string
    email: string
    password: string
    profilePicture?: string
  }) {
    const { fullName, email, password } = payload
    const hashedPassword = await (hash as any).make(password)
    const newUser = {
      email,
      password: hashedPassword,
    }

    const profile = {
      fullName,
      username: new Date().getTime() + '.' + fullName.split(' ')[0],
    }
    return await this.Query.createUser(newUser, profile)
  }

  public async forgetPassword(email: string) {
    // return await this.Query.forgetPassword(email)
  }

  public async resetPassword(token: string, newPassword: string) {
    // return await this.Query.resetPassword(token, newPassword)
  }

  public async updateUser(id: number, updates: { email?: string; password?: string }) {
    return await this.Query.updateUser(id, updates)
  }

  public async deleteUser(id: number) {
    return await this.Query.deleteUser(id)
  }
}
