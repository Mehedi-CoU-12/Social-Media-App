import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/create-comment', '#controllers/http/comments/controller.createComment')
    router.get('/get-comments/:postId', '#controllers/http/comments/controller.getCommentsByPost')
    router.put('/update-comment/:id', '#controllers/http/comments/controller.updateComment')
    router.delete('/delete-comment/:id', '#controllers/http/comments/controller.deleteComment')
  })
  .prefix('/api/comments')
