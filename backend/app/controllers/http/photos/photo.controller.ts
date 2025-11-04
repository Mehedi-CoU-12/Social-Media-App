import { inject } from "@adonisjs/core";
import PhotoService from "./photo.service.js";
import {HttpContext} from '@adonisjs/core/http'

@inject()
export default class PhotoController{
    constructor(private photoService:PhotoService){}

    public async getAllPhotos(ctx:HttpContext){
        return await this.photoService.getAllPhotos(Number(ctx.params.id));
    }
}