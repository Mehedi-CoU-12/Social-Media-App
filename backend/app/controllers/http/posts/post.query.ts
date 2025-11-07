import Post from '#models/post'
import Profile from '#models/profile'
import User from '#models/user'

export default class PostQuery {
  public async getUserAllPosts(profile: Profile) {
    return await Post.query().where('user_id', profile.userId).orderBy('created_at', 'desc')
  }

  public async getAllPosts() {
    return await Post.query()
      .preload('user', (userQuery) => {
        userQuery.preload('profile')
      })
      .orderBy('created_at', 'desc')
      .limit(10)
  }

  public async createPost(body: any) {
    const user = await User.query().where('id', body.user_id).first()
    if (!user) {
      throw new Error('User not found')
    }

    const postData = {
      content: body.content,
      user_id: body.user_id,
      image_url: body.imageUrl ?? null,
      video_url: body.videoUrl ?? null,
    }

    const post = await Post.create(postData)
    return post
  }
}
