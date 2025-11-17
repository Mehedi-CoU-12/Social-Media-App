import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Comment from './comment.js'
import Like from './like.js'
import { DateTime } from 'luxon'
import Friendship from './friend.js'
import Profile from './profile.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Friendship, { foreignKey: 'requesterId' })
  declare sentFriendRequests: HasMany<typeof Friendship>

  @hasMany(() => Friendship, { foreignKey: 'receiverId' })
  declare receivedFriendRequests: HasMany<typeof Friendship>
}
