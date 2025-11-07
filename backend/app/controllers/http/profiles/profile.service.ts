import ProfileQuery from './profile.query.js'

export default class ProfileService {
  private query: ProfileQuery
  constructor() {
    this.query = new ProfileQuery()
  }

  public async getProfile(id: number) {
    return await this.query.getProfile(id)
  }

  public async createProfile(data: any) {
    return await this.query.createProfile(data)
  }
}
