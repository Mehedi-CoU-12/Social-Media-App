import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('./user.controller.js')

router
  .group(() => {
    router.get('/get-all-users', [UsersController, 'getAllUsers'])
    router.get('/me/:id', [UsersController, 'getIndividualUser'])
    router.post('/login', [UsersController, 'login'])
    router.post('/register', [UsersController, 'createUser'])

    //authenticated route
    router
      .group(() => {
        router.get('/me', [UsersController, 'getMe'])
        router.get('/logout', [UsersController, 'logout'])
        router.post('/forget-password', [UsersController, 'forgetPassword'])
        router.put('/reset-password', [UsersController, 'resetPassword'])
        router.put('/update-user/:id', [UsersController, 'updateUser'])
        router.delete('/delete-user/:id', [UsersController, 'deleteUser'])
      })
      .middleware([middleware.auth()])
  })
  .prefix('/api/users')
