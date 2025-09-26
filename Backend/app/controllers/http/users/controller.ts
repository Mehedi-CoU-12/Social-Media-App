import type { HttpContext } from '@adonisjs/core/http'
import UsersService from './service.js'

export default class UsersController {
  private service = new UsersService()
  constructor() {
    this.service = new UsersService()
  }
  async getAllUsers({ response }: HttpContext) {
    return await this.service.getAllUsers()
  }
}
