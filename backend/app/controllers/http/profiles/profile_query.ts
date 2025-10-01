import Profile from '#models/profile'

export default class ProfileQuery {
  public async createProfile(data: any) {
    return await Profile.create(data)
  }
}
