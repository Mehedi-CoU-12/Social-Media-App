import PostQuery from './post_query.js'

export default class PostService {
  private Query = new PostQuery()
  constructor() {
    this.Query = new PostQuery()
  }

  public async getAllPosts(){
    return await this.Query.getAllPosts();
  }

  public async getUserAllPosts(id: number) {
    return await this.Query.getUserAllPosts(id)
  }
}
