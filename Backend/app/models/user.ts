import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Comment from './comment.js'
import Like from './like.js'
import { DateTime } from 'luxon'
import Friendship from './friend.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column({ columnName: 'profile_picture' })
  declare profilePicture: string | null

  //   @column()
  //   declare bio: string

  //   @column({ columnName: 'date_of_birth' })
  //   declare dateOfBirth: DateTime

  //   @column({ columnName: 'is_varified' })
  //   declare isVerified: boolean

  //   @column({ columnName: 'last_login_at' })
  //   declare lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
