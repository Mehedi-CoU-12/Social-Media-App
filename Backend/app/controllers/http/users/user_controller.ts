import type { HttpContext } from '@adonisjs/core/http'
import UserService from './user_service.js'

export default class UsersController {
  private service = new UserService()
  constructor() {
    this.service = new UserService()
  }
  public async getAllUsers({ response }: HttpContext) {
    return await this.service.getAllUsers()
  }

  public async getIndividualUser({ params, response }: HttpContext) {
    const { id } = params
    return await this.service.getIndividualUser(id)
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = request.body()
    return await this.service.login(email, password)
  }

  public async createUser({ request, response }: HttpContext) {
    const { name, email, password } = request.body()
    return await this.service.createUser(name, email, password)
  }

  public async forgetPassword({ request, response }: HttpContext) {
    const { email } = request.body()
    return await this.service.forgetPassword(email)
  }

  public async resetPassword({ request, response }: HttpContext) {
    const { token, newPassword } = request.body()
    return await this.service.resetPassword(token, newPassword)
  }

  public async updateUser({ params, request, response }: HttpContext) {
    const { id } = params
    const { username, email, password, profilePicture } = request.body()
    return await this.service.updateUser(id, { username, email, password, profilePicture })
  }

  public async deleteUser({ params, response }: HttpContext) {
    const { id } = params
    return await this.service.deleteUser(id)
  }
}
