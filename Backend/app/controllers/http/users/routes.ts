import router from '@adonisjs/core/services/router'
router
  .group(() => {
    router.get('/get-all-users', '#controllers/http/users/controller.getAllUsers')
    router.get('/get-individual-user', '#controllers/http/users/controller.getIndividualUser')
    router.post('/login', '#controllers/http/users/controller.login')
    router.post('/register', '#controllers/http/users/controller.register')
    router.post('/forget-password', '#controllers/http/users/controller.forgetPassword')
    router.put('/reset-password', '#controllers/http/users/controller.resetPassword')
    router.put('/update-user/:id', '#controllers/http/users/controller.updateUser')
    router.delete('/delete-user/:id', '#controllers/http/users/controller.deleteUser')
  })
  .prefix('/api/users')
