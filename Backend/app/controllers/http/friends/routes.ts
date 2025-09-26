import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/send-friend-request', '#controllers/http/friends/routes.sendFriendRequest')
    router.post('/accept-friend-request', '#controllers/http/friends/routes.acceptFriendRequest')
    router.post('/decline-friend-request', '#controllers/http/friends/routes.declineFriendRequest')
    router.get('/list-friends/:userId', '#controllers/http/friends/routes.listFriends')
    router.get(
      '/list-friend-requests/:userId',
      '#controllers/http/friends/routes.listFriendRequests'
    )
  })
  .prefix('/api/friends')
