import UsersQuery from './userQuery.js'

export default class UsersService {
  private Query: UsersQuery

  constructor() {
    this.Query = new UsersQuery()
  }

  public async getAllUsers() {
    return await this.Query.getAllUsers()
  }

  public async getIndividualUser(id: number) {
    return await this.Query.getUserById(id)
  }

  public async login(email: string, password: string) {
    console.log('-------------login service---------------------')
    // return await this.Query.login(email, password)
  }

  public async createUser(name: string, email: string, password: string) {
    return await this.Query.createUser({ name, email, password })
  }

  public async forgetPassword(email: string) {
    console.log('-------------forget password service---------------------')
    // return await this.Query.forgetPassword(email)
  }

  public async resetPassword(token: string, newPassword: string) {
    console.log('-------------reset service---------------------')
    // return await this.Query.resetPassword(token, newPassword)
  }

  public async updateUser(
    id: number,
    updates: { username?: string; email?: string; password?: string; profilePicture?: string }
  ) {
    return await this.Query.updateUser(id, updates)
  }

  public async deleteUser(id: number) {
    return await this.Query.deleteUser(id)
  }
}
