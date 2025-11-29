import Comment from '#models/comment'
import Post from '#models/post'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    const posts = await Post.all()
    const users = await User.all()

    // Check if we have posts and users
    if (posts.length === 0 || users.length === 0) {
      console.log('⚠️  No posts or users found. Skipping comment seeding.')
      return
    }

    // Check if comments already exist
    const existingComments = await Comment.query().limit(1)
    if (existingComments.length > 0) {
      console.log('⚠️  Comments already exist. Skipping comment seeding.')
      return
    }

    const comments = []

    for (let i = 0; i < 300; i++) {
      const post = faker.helpers.arrayElement(posts)
      const user = faker.helpers.arrayElement(users)
      comments.push({
        postId: post.id,
        userId: user.id,
        content: faker.helpers.arrayElement([
          faker.lorem.sentence(),
          faker.lorem.sentences(2),
          `${faker.lorem.words(3)}!`,
          `Amazing! ${faker.lorem.sentence()}`,
          `Great post! ${faker.lorem.words(3)}`,
          faker.lorem.words(5),
        ]),
      })
    }

    await Comment.createMany(comments)
    console.log('✅ Created 300 comments')
  }
}
