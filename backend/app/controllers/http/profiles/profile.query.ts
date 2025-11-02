import Profile from '#models/profile'

export default class ProfileQuery {
  public async getProfile(id: number) {
    return await Profile.query().where('id', id).preload('user').first()
  }

  public async createProfile(data: any) {
    return await Profile.create(data)
  }
}
