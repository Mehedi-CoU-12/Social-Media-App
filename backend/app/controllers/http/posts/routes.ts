import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/get-user-all-posts/:id', '#controllers/http/posts/controller.getUserAllPosts')
    router.get('/get-all-posts', '#controllers/http/posts/controller.getAllPosts')
    router.get('/get-single-posts/:id', '#controllers/http/posts/controller.getSinglePost')
    router.post('/create-post', '#controllers/http/posts/controller.createPost')
    router.put('/update-post/:id', '#controllers/http/posts/controller.updatePost')
    router.delete('/delete-post/:id', '#controllers/http/posts/controller.deletePost')
  })
  .prefix('api/posts')
//   .middleware('auth')
