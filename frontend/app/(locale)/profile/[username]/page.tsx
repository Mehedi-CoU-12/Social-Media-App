'use client'

import PostCard from '@/components/post_card/PostCard'
import PostCreate from '@/components/post_create/PostCreate'
import IntroductionSection from '../IntroductionSection'
import ProfileAndCoverPhoto from '../ProfileAndCoverPhoto'
import Header from '@/components/Header'
import Friends from '../Friends'
import Photos from '../Photos'
import { useParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Loader from '@/components/Loader'
import SuggestFrined from '@/components/SuggestFrined'
import { useQueries } from '@tanstack/react-query'
import api from '@/lib/axiosInstance'

export default function ProfilePage() {
    const { data: user, isLoading: isAuthQuery } = useAuth()

    const params = useParams()
    const { username } = params

    // Fetch profile, posts, friends, and photos in parallel
    const results = useQueries({
        queries: [
            {
                queryKey: ['profile', username],
                queryFn: () =>
                    api.get(`/api/profile/me/${username}`).then((r) => r.data),
            },
            {
                queryKey: ['posts', username],
                queryFn: () =>
                    api
                        .get(`/api/posts/user-posts/${username}`)
                        .then((r) => r.data.data),
            },
            {
                queryKey: ['friends', username],
                queryFn: () =>
                    api
                        .get(`/api/friends/list-friends/${username}`)
                        .then((r) => r.data.data),
            },
            {
                queryKey: ['photos', username],
                queryFn: () =>
                    api
                        .get(`/api/photos/get-all-photos/${username}`)
                        .then((r) => r.data),
            },
        ],
    })

    const [profileQuery, postsQuery, friendsQuery, photosQuery] = results

    const isLoading =
        profileQuery.isLoading ||
        postsQuery.isLoading ||
        friendsQuery.isLoading ||
        photosQuery.isLoading

    if (isLoading || isAuthQuery) return <Loader />

    const profile = profileQuery.data
    const posts = postsQuery.data
    const friends = friendsQuery.data
    const photos = photosQuery.data

    return (
        <div className="_layout _layout_main_wrapper">
            <Header />
            <div className="_profile_wrapper">
                <div className="_profile_wrap">
                    <div className="container">
                        {/* #--------- profile photo and cover photo section start----------*/}
                        <ProfileAndCoverPhoto profile={profile} />
                        <div className="_layout_inner_wrap_area">
                            <div className="row">
                                {/* #------------ profile left section start------------ */}
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                    <div className="_layout_left_wrap sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                                        <div className="_layout_left_sidebar_inner">
                                            <IntroductionSection />
                                            <Photos
                                                title="Photos"
                                                photos={photos}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* #------------ profile middle section start------------ */}
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <PostCreate
                                        avatarUrl={
                                            profile?.profilePictureUrl ||
                                            '/profile_image.webp'
                                        }
                                    />
                                    {posts &&
                                        posts.length > 0 &&
                                        posts.map((post, index) =>
                                            post && post.id ? (
                                                <PostCard
                                                    key={`post-${post.id}`}
                                                    author={{
                                                        name:
                                                            profile?.displayName ||
                                                            'Unknown User',
                                                        avatarUrl:
                                                            profile?.profilePictureUrl ||
                                                            '/profile_image.webp',
                                                    }}
                                                    post={post}
                                                />
                                            ) : null
                                        )}
                                </div>

                                {/* #------------ profile right section end------------ */}
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                    <div className="_layout_right_wrap sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                                        <SuggestFrined />
                                        <Friends
                                            title="Friends"
                                            friends={friends}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
