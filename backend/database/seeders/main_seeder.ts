import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from './user_seeder.js'
import ProfileSeeder from './profile_seeder.js'
import PostSeeder from './post_seeder.js'
import CommentSeeder from './comment_seeder.js'
import LikeSeeder from './like_seeder.js'
import FriendshipSeeder from './friend_seeder.js'

export default class MainSeeder extends BaseSeeder {
  public async run() {
    // Run seeders in dependency order
    await new UserSeeder(this.client).run()
    await new ProfileSeeder(this.client).run()
    await new PostSeeder(this.client).run()
    await new CommentSeeder(this.client).run()
    await new LikeSeeder(this.client).run()
    await new FriendshipSeeder(this.client).run()
    
    console.log('✅ All seeders completed successfully!')
  }
}