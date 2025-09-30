// app/models/profile.ts
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  // Basic Info
  @column()
  declare username: string | null

  @column({ columnName: 'display_name' })
  declare displayName: string | null

  @column()
  declare bio: string | null

  @column({ columnName: 'profile_picture_url' })
  declare profilePictureUrl: string | null

  @column({ columnName: 'cover_photo_url' })
  declare coverPhotoUrl: string | null

  // Contact
  @column({ columnName: 'phone_number' })
  declare phoneNumber: string | null

  @column({ columnName: 'website_url' })
  declare websiteUrl: string | null

  @column()
  declare location: string | null

  @column()
  declare timezone: string

  // Personal
  @column({ columnName: 'date_of_birth' })
  declare dateOfBirth: DateTime | null

  @column()
  declare gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null

  // Status
  @column({ columnName: 'is_verified' })
  declare isVerified: boolean

  @column({ columnName: 'is_private' })
  declare isPrivate: boolean

  @column({ columnName: 'is_active' })
  declare isActive: boolean

  @column({ columnName: 'account_type' })
  declare accountType: 'personal' | 'business' | 'creator'

  // Privacy
  @column({ columnName: 'show_email' })
  declare showEmail: boolean

  @column({ columnName: 'allow_friend_requests' })
  declare allowFriendRequests: boolean

  // Counts
  @column({ columnName: 'followers_count' })
  declare followersCount: number

  @column({ columnName: 'following_count' })
  declare followingCount: number

  @column({ columnName: 'posts_count' })
  declare postsCount: number

  // JSON Columns
  @column({ columnName: 'notification_preferences' })
  declare notificationPreferences: Record<string, any> | null

  @column({ columnName: 'social_links' })
  declare socialLinks: Record<string, string> | null

  @column()
  declare interests: string[] | null

  // Activity
  @column.dateTime({ columnName: 'last_seen_at' })
  declare lastSeenAt: DateTime | null

  @column.dateTime({ columnName: 'email_verified_at' })
  declare emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
