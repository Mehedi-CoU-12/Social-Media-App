import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/me/:id', '#controllers/http/profiles/profile_controller.getProfile')
    router.post('/create-profile', '#controllers/http/profiles/profile_controller.createProfile')
    router.put('/update-profile/:id', '#controllers/http/profiles/profile_controller.updateProfile')
    router.delete(
      '/delete-profile/:id',
      '#controllers/http/profiles/profile_controller.deleteProfile'
    )
  })
  .prefix('/api/profile')
//   .middleware(middleware.auth())
