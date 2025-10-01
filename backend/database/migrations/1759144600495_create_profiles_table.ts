import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      // Basic Profile Info
      table.string('username', 30).unique().nullable() // @username
      table.string('display_name', 100).nullable()
      table.text('bio').nullable()
      table.string('profile_picture_url').nullable()
      table.string('cover_photo_url').nullable()

      // Contact & Location
      table.string('phone_number', 20).nullable()
      table.string('website_url').nullable()
      table.string('location', 100).nullable()
      table.string('timezone', 50).defaultTo('UTC')

      // Personal Info
      table.date('date_of_birth').nullable()
      table.enum('gender', ['male', 'female', 'other', 'prefer_not_to_say']).nullable()

      // Account Status
      table.boolean('is_verified').defaultTo(false)
      table.boolean('is_private').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.enum('account_type', ['personal', 'business', 'creator']).defaultTo('personal')

      // Privacy Settings
      table.boolean('show_email').defaultTo(false)
      table.boolean('show_phone').defaultTo(false)
      table.boolean('show_birthday').defaultTo(true)
      table.enum('allow_messages_from', ['everyone', 'friends', 'nobody']).defaultTo('friends')
      table.boolean('allow_friend_requests').defaultTo(true)

      // Cached Counts (Updated via triggers/jobs)
      table.integer('followers_count').defaultTo(0)
      table.integer('following_count').defaultTo(0)
      table.integer('posts_count').defaultTo(0)

      // Preferences (JSON columns)
      table.json('notification_preferences').nullable()
      table.json('social_links').nullable() // {instagram: "url", twitter: "url"}
      table.json('interests').nullable() // ["technology", "sports", "music"]

      // Activity Tracking
      table.timestamp('last_seen_at').nullable()
      table.timestamp('email_verified_at').nullable()

      // Timestamps
      table.timestamps(true)

      // Indexes for performance
      table.index(['user_id'])
      table.index(['username'])
      table.index(['is_private'])
      table.index(['is_active'])
    })
  }
}
