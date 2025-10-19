import Post from '#models/post'

export default class PostQuery {
  public async getUserAllPosts(id: number) {
    return await Post.query()
      .where('user_id', id)
      .preload('user', (userQuery) => {
        userQuery.preload('profile')
      })
      .orderBy('created_at', 'desc')
  }

  public async getAllPosts() {
    return await Post.query()
      .preload('user', (userQuery) => {
        userQuery.preload('profile')
      })
      .orderBy('created_at', 'desc')
  }
}
