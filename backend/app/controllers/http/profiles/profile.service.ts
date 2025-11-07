import ProfileQuery from './profile.query.js'

export default class ProfileService {
  private query: ProfileQuery
  constructor() {
    this.query = new ProfileQuery()
  }

  public async getProfile(payload: { id?: any }) {
    return await this.query.getProfile(payload.id)
  }

  public async createProfile(data: any) {
    return await this.query.createProfile(data)
  }

  public async updateProfile(payload: any) {}

  public async deleteProfile(payload: any) {}
}
