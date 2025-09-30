import ProfileQuery from './profile_query.js'

export default class ProfileService {
  private query: ProfileQuery
  constructor() {
    this.query = new ProfileQuery()
  }

  public async createProfile(data: any) {
    return await this.query.createProfile(data)
  }
}
