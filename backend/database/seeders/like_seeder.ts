import Like from '#models/like'
import User from '#models/user'
import Post from '#models/post'
import { faker } from '@faker-js/faker'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class LikeSeeder extends BaseSeeder {
  public async run() {
    // fetch all post and user IDs
    const users = await User.all()
    const posts = await Post.all()

    // Check if we have posts and users
    if (posts.length === 0 || users.length === 0) {
      console.log('⚠️  No posts or users found. Skipping like seeding.')
      return
    }

    // Check if likes already exist
    const existingLikes = await Like.query().limit(1)
    if (existingLikes.length > 0) {
      console.log('⚠️  Likes already exist. Skipping like seeding.')
      return
    }

    const likes: Array<{ postId: number; userId: number }> = []
    const likeSet = new Set<string>()
    const userIds = users.map((u) => u.id)
    const postIds = posts.map((p) => p.id)

    while (likes.length < 200) {
      const postId = faker.helpers.arrayElement(postIds)
      const userId = faker.helpers.arrayElement(userIds)
      const key = `${postId}-${userId}`

      if (!likeSet.has(key)) {
        likeSet.add(key)
        likes.push({ postId, userId })
      }
    }

    await Like.createMany(likes)
    console.log('✅ Created 200 likes')
  }
}
