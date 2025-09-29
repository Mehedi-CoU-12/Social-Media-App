import router from '@adonisjs/core/services/router'
router
  .group(() => {
    router.get('/get-all-users', '#controllers/http/users/user_controller.getAllUsers')
    router.get(
      '/get-individual-user/:id',
      '#controllers/http/users/user_controller.getIndividualUser'
    )
    router.post('/login', '#controllers/http/users/user_controller.login')
    router.post('/register', '#controllers/http/users/user_controller.createUser')
    router.post('/forget-password', '#controllers/http/users/user_controller.forgetPassword')
    router.put('/reset-password', '#controllers/http/users/user_controller.resetPassword')
    router.put('/update-user/:id', '#controllers/http/users/user_controller.updateUser')
    router.delete('/delete-user/:id', '#controllers/http/users/user_controller.deleteUser')
  })
  .prefix('/api/users')
