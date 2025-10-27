import Post from '#models/post'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class PostSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const posts = []

    // Generate posts for each user
    for (const user of users) {
      const postCount = faker.number.int({ min: 0, max: 15 })

      for (let i = 0; i < postCount; i++) {
        const postType = faker.helpers.arrayElement(['text', 'image', 'video', 'text_image'])

        let content = ''
        let imageUrl = null
        let videoUrl = null

        // Generate content based on post type
        switch (postType) {
          case 'text':
            content = faker.helpers.arrayElement([
              faker.lorem.paragraph(),
              faker.lorem.sentences(2),
              faker.company.catchPhrase(),
              `Just finished ${faker.lorem.words(3)}! ${faker.lorem.sentence()}`,
              `Thinking about ${faker.lorem.words(2)}... ${faker.lorem.sentence()}`,
              `Great day at ${faker.location.city()}! ${faker.lorem.sentence()}`,
            ])
            break

          case 'image':
            content = faker.helpers.arrayElement([
              faker.lorem.sentence(),
              `Check out this ${faker.lorem.word()}!`,
              faker.lorem.words(5),
              '', // Sometimes no caption
            ])
            imageUrl = faker.image.url({ width: 800, height: 600 })
            break

          case 'video':
            content = faker.helpers.arrayElement([
              faker.lorem.sentence(),
              `Watch this ${faker.lorem.word()}!`,
              faker.lorem.words(3),
              '',
            ])
            videoUrl = faker.helpers.arrayElement([
              'https://sample-videos.com/zip/10/mp4/mp4-1920-1080-1-1.mp4',
              'https://sample-videos.com/zip/10/mp4/mp4-640-360-1-1.mp4',
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            ])
            break

          case 'text_image':
            content = faker.lorem.paragraph()
            imageUrl = faker.image.url({ width: 800, height: 600 })
            break
        }

        posts.push({
          userId: user.id,
          content,
          imageUrl,
          videoUrl,
        })
      }
    }

    await Post.createMany(posts)
  }
}
