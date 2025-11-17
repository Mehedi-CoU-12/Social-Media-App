import api from '@/lib/axiosInstance'
import { useState } from 'react'
import { Post, Profile, User } from '@/app/types/types'

export default function useProfile() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<Profile>()
    const [posts, setPosts] = useState<Post[]>([])
    const [friends, setFriends] = useState<User[]>([])
    const [photos, setPhotos] = useState<any[]>([])

    const fetchProfile = async (profileId: number | string) => {
        try {
            setLoading(true)
            const [
                profileResponse,
                postResponse,
                friendsResponse,
                photoResponse,
            ] = await Promise.all([
                api.get(`/api/profile/me/${profileId}`),
                api.get(`/api/posts/user-posts/${profileId}`),
                api.get(`/api/friends/list-friends/${profileId}`),
                api.get(`api/photos/get-all-photos/${profileId}`),
            ])

            console.log('-------posts data------', postResponse.data.data)
            console.log('-------profile data------', profileResponse.data)
            console.log('-------friends data------', friendsResponse.data)
            console.log('-------photos data------', photoResponse.data)

            setPosts(postResponse.data.data)
            setProfile(profileResponse.data)
            setFriends(friendsResponse.data.data)
            setPhotos(photoResponse.data)
        } catch (error) {
            console.error('Error fetching profile data:', error)
            // Handle error appropriately, e.g., show a notification or log it
            // You might want to set an error state here as well
            // setError(error);
        } finally {
            setLoading(false)
        }
    }

    return { profile, posts, friends, photos, loading, fetchProfile }
}
