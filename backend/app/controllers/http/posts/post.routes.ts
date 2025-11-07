import router from '@adonisjs/core/services/router'
const PostController = () => import('./post.controller.js')

router
  .group(() => {
    router.get('/user-posts/:id', [PostController, 'getUserAllPosts'])
    router.get('/get-all-posts', [PostController, 'getAllPosts'])
    router.get('/get-single-posts/:id', [PostController, 'getSinglePost'])
    router.post('/create-post', [PostController, 'createPost'])
    router.put('/update-post/:id', [PostController, 'updatePost'])
    router.delete('/delete-post/:id', [PostController, 'deletePost'])
  })
  .prefix('api/posts')
//   .middleware('auth')
