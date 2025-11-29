import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Comment from './comment.js'
import Like from './like.js'
import { DateTime } from 'luxon'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare content: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string | null

  @column({ columnName: 'video_url' })
  declare videoUrl: string | null

  @column()
  declare location: string | null

  @column({ columnName: 'likes_count' })
  declare likesCount: number

  @column({ columnName: 'comments_count' })
  declare commentsCount: number

  @column({ columnName: 'shares_count' })
  declare sharesCount: number

  @column({ columnName: 'privacy_setting' })
  declare privacySetting: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>
}
