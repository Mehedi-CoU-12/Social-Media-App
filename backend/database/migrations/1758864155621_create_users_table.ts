import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('profile_picture').nullable()
      //   table.string('bio').nullable()
      //   table.date('date_of_birth').nullable()
      //   table.boolean('is_verified').defaultTo(false)
      //   table.timestamp('last_login_at', { useTz: true }).nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
