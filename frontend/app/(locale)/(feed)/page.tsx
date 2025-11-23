'use client'
import Header from '@/components/Header'
import Explore from '@/components/Explore'
import YouMightLike from '@/components/YouMightLike'
import Events from '@/components/Events'
import FriendLists from '@/components/FriendLists'
import Story from '@/components/Story'
import PostCreate from '@/components/post_create/PostCreate'
import PostCard from '@/components/post_card/PostCard'
import api from '@/lib/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import SuggestFrined from '@/components/SuggestFrined'
import { useAuth } from '@/hooks/useAuth'
import { notFound } from 'next/navigation'

export default function Home() {
    const { data: user, isLoading } = useAuth()
    const {
        data: posts,
        isLoading: isPostLoading,
        isError,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await api.get('/api/posts/get-all-posts')
            return res.data.data
        },
    })

    if (isLoading || isPostLoading) return <Loader />

    if (isError) return notFound()

    return (
        <div className="_layout _layout_main_wrapper">
            <div className="_main_layout">
                <Header />
                <div className="_container_fluid_custom">
                    <div className="_layout_inner_wrap p-0 _layout_inner_wrap1">
                        <div className="row">
                            {/* <!-- Left Sidebar --> */}
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                <div className="_layout_left_sidebar_wrap">
                                    <Explore />
                                    <SuggestFrined />
                                    <YouMightLike />
                                    <Events />
                                </div>
                            </div>
                            {/* <!-- Left Sidebar -->
						<!-- Layout Middle --> */}
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="_layout_middle_wrap _layout_middle_padding">
                                    <div className="_layout_middle_inner">
                                        <Story />
                                        <PostCreate />
                                        {posts &&
                                            posts.length > 0 &&
                                            posts.map((post, index) =>
                                                post && post.id ? (
                                                    <PostCard
                                                        key={`post-${post.id}`}
                                                        author={{
                                                            name:
                                                                post?.user
                                                                    ?.name ||
                                                                'Unknown User',
                                                            avatarUrl:
                                                                post?.user
                                                                    ?.profile
                                                                    ?.profilePictureUrl ||
                                                                '/images/Avatar.png',
                                                        }}
                                                        post={post}
                                                    />
                                                ) : null
                                            )}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Layout Middle -->
						<!-- Right Sidebar --> */}
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                <FriendLists />
                            </div>
                            {/* <!-- Right Sidebar --> */}
                        </div>
                        {/* <!-- Main Layout Structure --> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
