import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Friendships extends BaseSchema {
  protected tableName = 'friendships'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requester_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('receiver_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('status', ['pending', 'accepted', 'rejected']).defaultTo('pending')
      table.unique(['requester_id', 'receiver_id']) // prevent duplicate requests
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
