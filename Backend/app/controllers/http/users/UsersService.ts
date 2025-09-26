import UsersQuery from './userQuery.js'

export default class UsersService {
  private Query: UsersQuery

  constructor() {
    this.Query = new UsersQuery()
  }

  async getAllUsers() {
    return await this.Query.getAllUsers()
  }
}
