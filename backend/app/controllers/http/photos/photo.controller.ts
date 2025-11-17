import { inject } from '@adonisjs/core'
import PhotoService from './photo.service.js'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PhotoController {
  constructor(private photoService: PhotoService) {}

  public async getAllPhotos(ctx: HttpContext) {
    console.log('🚀 ~ PhotoController ~ getAllPhotos ~ ctx.auth.user:', ctx.auth.user)
    return await this.photoService.getAllPhotos(Number(1))
    // return await this.photoService.getAllPhotos(Number(ctx.params.id))
  }
}
