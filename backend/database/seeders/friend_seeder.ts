import Friendship from '#models/friend'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class FriendshipSeeder extends BaseSeeder {
  public async run() {
    // fetch all user IDs
    const users = await User.all()

    // Check if we have enough users
    if (users.length < 2) {
      console.log('⚠️  Not enough users found. Skipping friendship seeding.')
      return
    }

    // Check if friendships already exist
    const existingFriendships = await Friendship.query().limit(1)
    if (existingFriendships.length > 0) {
      console.log('⚠️  Friendships already exist. Skipping friendship seeding.')
      return
    }

    const friendships = []
    const friendshipSet = new Set<string>()
    const userIds = users.map((u) => u.id)

    while (friendships.length < 100) {
      const requesterId = faker.helpers.arrayElement(userIds)
      let receiverId = faker.helpers.arrayElement(userIds)

      // Skip if same user
      if (requesterId === receiverId) continue

      // Create a unique key that prevents both A->B and B->A
      const key = [requesterId, receiverId].sort().join('-')

      if (!friendshipSet.has(key)) {
        friendshipSet.add(key)
        friendships.push({
          requesterId,
          receiverId,
          status: faker.helpers.arrayElement(['pending', 'accepted', 'rejected']),
        })
      }
    }

    await Friendship.createMany(friendships)
    console.log('✅ Created 100 friendships')
  }
}
