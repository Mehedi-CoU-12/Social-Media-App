import Comment from '#models/comment'
import Post from '#models/post'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    const posts = await Post.all()
    const users = await User.all()
    const comments = []
    for (let i = 0; i < 300; i++) {
      const post = faker.helpers.arrayElement(posts)
      const user = faker.helpers.arrayElement(users)
      comments.push({
        postId: post.id,
        userId: user.id,
        content: faker.lorem.sentence(),
      })
    }
    await Comment.createMany(comments)
  }
}
