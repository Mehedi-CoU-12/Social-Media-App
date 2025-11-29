import Profile from '#models/profile'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class ProfileSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()

    if (users.length === 0) {
      console.log('⚠️  No users found. Skipping profile seeding.')
      return
    }

    // Check if profiles already exist
    const existingProfiles = await Profile.query().limit(1)
    if (existingProfiles.length > 0) {
      console.log('⚠️  Profiles already exist. Skipping profile seeding.')
      return
    }

    const profiles = []

    for (const user of users) {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()

      // Generate date of birth
      const dobDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
      const dateOfBirth = faker.helpers.arrayElement([DateTime.fromJSDate(dobDate), null])

      profiles.push({
        userId: user.id,
        username: user.username,
        displayName: `${firstName} ${lastName}`,
        bio: faker.helpers.arrayElement([
          faker.lorem.sentence(),
          faker.person.jobTitle(),
          faker.lorem.sentences(2),
          null,
        ]),
        profilePictureUrl: user.profilePictureUrl,
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
        timezone: faker.helpers.arrayElement([
          'UTC',
          'America/New_York',
          'America/Los_Angeles',
          'Europe/London',
          'Asia/Tokyo',
        ]),
        dateOfBirth,
        gender: faker.helpers.arrayElement(['male', 'female', 'other', 'prefer_not_to_say', null]),
        isVerified: faker.helpers.arrayElement([true, false, false, false]),
        isPrivate: faker.helpers.arrayElement([true, false, false, false]),
        isActive: true,
        accountType: faker.helpers.arrayElement(['personal', 'business', 'creator']),
        showEmail: faker.datatype.boolean(),
        showPhone: faker.datatype.boolean(),
        showBirthday: faker.datatype.boolean(),
        allowMessagesFrom: faker.helpers.arrayElement(['everyone', 'friends', 'nobody']),
        allowFriendRequests: faker.datatype.boolean(),
        followersCount: faker.number.int({ min: 0, max: 1000 }),
        followingCount: faker.number.int({ min: 0, max: 500 }),
        postsCount: 0,
        notificationPreferences: JSON.stringify({
          emailNotifications: faker.datatype.boolean(),
          pushNotifications: faker.datatype.boolean(),
          likes: faker.datatype.boolean(),
          comments: faker.datatype.boolean(),
          friendRequests: faker.datatype.boolean(),
        }),
        socialLinks: JSON.stringify(
          faker.helpers.maybe(
            () => ({
              instagram: faker.internet.url(),
              twitter: faker.internet.url(),
              linkedin: faker.internet.url(),
              facebook: faker.internet.url(),
            }),
            { probability: 0.7 }
          ) || {}
        ),
        interests: JSON.stringify(
          faker.helpers.arrayElements(
            [
              'technology',
              'sports',
              'music',
              'art',
              'photography',
              'travel',
              'food',
              'fitness',
              'gaming',
              'reading',
              'movies',
              'fashion',
            ],
            faker.number.int({ min: 2, max: 6 })
          )
        ),
        lastSeenAt: DateTime.fromJSDate(faker.date.recent({ days: 7 })),
        emailVerifiedAt: faker.helpers.arrayElement([DateTime.fromJSDate(faker.date.past()), null]),
      })
    }

    await Profile.createMany(profiles)
    console.log('✅ Created profiles for all users')
  }
}
