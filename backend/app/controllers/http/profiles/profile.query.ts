import Profile from '#models/profile'

export default class ProfileQuery {
  public async getProfile(id: number | string) {
    return await Profile.query().where('id', id).orWhere('username', id).select('*').first()
  }

  public async createProfile(data: any) {
    return await Profile.create(data)
  }

  public async updateProfile(profile: Profile, updates: any) {
    profile.merge(updates)
    await profile.save()
    return profile
  }

  public async deleteProfile(profile: Profile) {
    await profile.delete()
  }
}
