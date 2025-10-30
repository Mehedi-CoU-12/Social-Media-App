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
        router.get('/logout', '#controllers/http/users/user_controller.logout')
        router.post('/forget-password', '#controllers/http/users/user_controller.forgetPassword')
        router.put('/reset-password', '#controllers/http/users/user_controller.resetPassword')
        router.put('/update-user/:id', '#controllers/http/users/user_controller.updateUser')
        router.delete('/delete-user/:id', '#controllers/http/users/user_controller.deleteUser')
      })
      .middleware([middleware.auth()])
  })
  .prefix('/api/users')
