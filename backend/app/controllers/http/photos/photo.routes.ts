import router from '@adonisjs/core/services/router';

const PhotoController = () => import('./photo.controller.js')
router.group(()=>{
    router.get('/get-all-photos/:id',[PhotoController,'getAllPhotos'])
})
.prefix('api/photos')
// .middleware('auth');