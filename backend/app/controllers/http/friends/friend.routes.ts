import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const FriendController = () => import('./friend.controller.js')

router
  .group(() => {
    router.post('/send-friend-request', [FriendController, 'sendFriendRequest'])
    router.post('/accept-friend-request', [FriendController, 'acceptFriendRequest'])
    router.post('/decline-friend-request', [FriendController, 'declineFriendRequest'])
    router.get('/list-friends/:userId', [FriendController, 'listFriends'])
    router.get('/list-friend-requests/:userId', [FriendController, 'listFriendRequests'])
    router.get('/list-sent-requests/:userId', [FriendController, 'listSentRequests'])
  })
  .prefix('/api/friends')
// .middleware(middleware.auth())
