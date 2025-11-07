import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ProfileController = () => import('./profile.controller.js')

router
  .group(() => {
    router.get('/me/:id', [ProfileController, 'getProfile'])
    router.post('/create-profile', [ProfileController, 'createProfile'])
    router.put('/update-profile/:id', [ProfileController, 'updateProfile'])
    router.delete('/delete-profile/:id', [ProfileController, 'deleteProfile'])
  })
  .prefix('/api/profile')
//   .middleware(middleware.auth())
