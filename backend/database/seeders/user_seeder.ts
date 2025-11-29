import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Check if users already exist
    const existingUsers = await User.query().limit(1)
    if (existingUsers.length > 0) {
      console.log('⚠️  Users already exist. Skipping user seeding.')
      return
    }

    const users = []

    // Create a few specific test users
    users.push({
      username: 'admin',
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash.make('password123'),
      profilePictureUrl: faker.image.avatar(),
    })

    users.push({
      username: 'testuser',
      name: 'Test User',
      email: 'user@example.com',
      password: await hash.make('password123'),
      profilePictureUrl: faker.image.avatar(),
    })

    // Generate random users with unique usernames and emails
    const usedUsernames = new Set(['admin', 'testuser'])
    const usedEmails = new Set(['admin@example.com', 'user@example.com'])

    for (let i = 0; i < 48; i++) {
      let username = faker.internet.username().toLowerCase()
      let email = faker.internet.email().toLowerCase()

      // Ensure uniqueness
      while (usedUsernames.has(username)) {
        username = faker.internet.username().toLowerCase()
      }
      while (usedEmails.has(email)) {
        email = faker.internet.email().toLowerCase()
      }

      usedUsernames.add(username)
      usedEmails.add(email)

      users.push({
        username,
        name: faker.person.fullName(),
        email,
        password: await hash.make('password123'),
        profilePictureUrl: faker.helpers.arrayElement([faker.image.avatar(), null]),
      })
    }

    await User.createMany(users)
    console.log('✅ Created 50 users')
  }
}
