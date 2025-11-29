import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.text('content').nullable()
      table.string('image_url').nullable()
      table.string('video_url').nullable()
      table.string('location').nullable()
      table.integer('likes_count').defaultTo(0)
      table.integer('comments_count').defaultTo(0)
      table.integer('shares_count').defaultTo(0)
      table.string('privacy_setting').defaultTo('public')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
