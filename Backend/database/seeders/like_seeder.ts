import Like from '#models/like'
import User from '#models/user'
import Post from '#models/post'
import { faker } from '@faker-js/faker'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class LikeSeeder extends BaseSeeder {
  public async run() {
    const likes: Array<{ postId: number; userId: number }> = []
    const likeSet = new Set<string>()

    // fetch all post and user IDs
    const users = await User.all()
    const posts = await Post.all()
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
  }
}
