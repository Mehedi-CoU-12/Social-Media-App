import Post from "#models/post";

export default class PhotoQuery{
    public async getAllPhotos(userId:number) {
        // Logic to retrieve all photos for a specific user
        return Post.query().where('user_id',userId).whereNotNull('image_url').select('image_url','id','content').orderBy('created_at','desc') ;
    }
}