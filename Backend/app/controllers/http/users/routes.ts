import router from '@adonisjs/core/services/router'
router
  .group(() => {
    router.get('/get-all-users', '#controllers/http/users/userController.getAllUsers')
    router.get(
      '/get-individual-user/:id',
      '#controllers/http/users/userController.getIndividualUser'
    )
    router.post('/login', '#controllers/http/users/userController.login')
    router.post('/register', '#controllers/http/users/userController.createUser')
    router.post('/forget-password', '#controllers/http/users/userController.forgetPassword')
    router.put('/reset-password', '#controllers/http/users/userController.resetPassword')
    router.put('/update-user/:id', '#controllers/http/users/userController.updateUser')
    router.delete('/delete-user/:id', '#controllers/http/users/userController.deleteUser')
  })
  .prefix('/api/users')
