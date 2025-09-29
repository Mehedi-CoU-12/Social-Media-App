import PostQuery from './post_query.js'

export default class PostService {
  private Query = new PostQuery()
  constructor() {
    this.Query = new PostQuery()
  }

  public async getUserAllPosts(id: number) {
    return await this.Query.getUserAllPosts(id)
  }
}
