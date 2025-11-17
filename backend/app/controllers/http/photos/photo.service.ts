import { inject } from '@adonisjs/core'
import PhotoQuery from './photo.query.js'

@inject()
export default class PhotoService {
  constructor(private photoQuery: PhotoQuery) {}

  public async getAllPhotos(userId: number) {
    return await this.photoQuery.getAllPhotos(userId)
  }
}
