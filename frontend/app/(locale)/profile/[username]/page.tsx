'use client'
import PostCard from '@/components/post_card/PostCard'
import PostCreate from '@/components/post_create/PostCreate'
import IntroductionSection from '../IntroductionSection'
import ProfileAndCoverPhoto from '../ProfileAndCoverPhoto'
import Header from '@/components/Header'
import Friends from '../Friends'
import Photos from '../Photos'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import useProfile from './useProfile'
import Loader from '@/components/Loader'
import SuggestFrined from '@/components/SuggestFrined'

export default function ProfilePage() {
    const { profile, posts, friends, photos, loading, fetchProfile } =
        useProfile()
    const params = useParams()
    const { username } = params

    useEffect(() => {
        fetchProfile(username)
    }, [username])

    if (loading) return <Loader />

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
