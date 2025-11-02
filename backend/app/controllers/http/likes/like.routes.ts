import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/post-likes/:postId', '#controllers/http/likes/controller.getPostLikes')
    router.get('/user-likes/:userId', '#controllers/http/likes/controller.getUserLikes')
    router.post('/like/:postId', '#controllers/http/likes/controller.likePost')
    router.put('/unlike/:postId', '#controllers/http/likes/controller.unlikePost')
  })
  .prefix('/api/likes')
