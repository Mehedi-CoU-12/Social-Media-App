import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const users = []

    // Create a few specific test users
    users.push({
      username: 'admin',
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash.make('password123'),
      profilePicture: faker.image.avatar(),
    })

    users.push({
      username: 'testuser',
      name: 'Test User',
      email: 'user@example.com',
      password: await hash.make('password123'),
      profilePicture: faker.image.avatar(),
    })

    // Generate random users
    for (let i = 0; i < 48; i++) {
      users.push({
        username: faker.internet.username().toLowerCase(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash.make('password123'),
        profilePicture: faker.helpers.arrayElement([faker.image.avatar(), null]),
      })
    }

    await User.createMany(users)
  }
}
