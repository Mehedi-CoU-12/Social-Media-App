import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const users = []
    
    // Create a few specific test users
    users.push({
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash.make('password123'),
    })
    
    users.push({
      name: 'Test User',
      email: 'user@example.com',
      password: await hash.make('password123'),
    })
    
    // Generate random users
    for (let i = 0; i < 48; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash.make('password123'),
      })
    }
    
    await User.createMany(users)
  }
}