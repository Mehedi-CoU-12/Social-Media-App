import Post from '#models/post'

export default class PostQuery {
  public async getUserAllPosts(id: number) {
    return await Post.query().where('user_id', id)
  }
}
