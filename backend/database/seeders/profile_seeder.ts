import Profile from '#models/profile'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class ProfileSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const profiles = []

    for (const user of users) {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()

      profiles.push({
        userId: user.id,
        username: faker.internet.username().toLowerCase(),
        displayName: `${firstName} ${lastName}`,
        bio: faker.helpers.arrayElement([faker.lorem.sentence(), faker.person.jobTitle(), null]),
        profilePictureUrl: faker.helpers.arrayElement([faker.image.avatar(), null]),
        coverPhotoUrl: faker.helpers.arrayElement([
          faker.image.url({ width: 1200, height: 400 }),
          null,
        ]),
        phoneNumber: faker.helpers.arrayElement([faker.phone.number().substring(0, 15), null]),
        websiteUrl: faker.helpers.arrayElement([faker.internet.url(), null]),
        location: faker.helpers.arrayElement([
          `${faker.location.city()}, ${faker.location.state()}`,
          null,
        ]),
        gender: faker.helpers.arrayElement(['male', 'female', 'other', 'prefer_not_to_say', null]),
        isVerified: faker.helpers.arrayElement([true, false, false, false]),
        isPrivate: faker.helpers.arrayElement([true, false, false, false]),
        isActive: true,
        accountType: faker.helpers.arrayElement(['personal', 'business', 'creator']),
      })
    }

    await Profile.createMany(profiles)
  }
}
