"use client";
import PostCard from "@/components/PostCard";
import PostCreate from "@/components/PostCreate";
import IntroductionSection from "../IntroductionSection";
import PhotoOrFriendList from "../PhotoOrFriendList";
import SuggestFrined from "../../../components/SuggestFrined";
import ProfileAndCoverPhoto from "../ProfileAndCoverPhoto";
import Header from "@/components/Header";
import api from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { Post, Profile, User } from "@/app/types/types";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState();
    const [profile, setProfile] = useState<Profile>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User>();

    const fetchProfile = async (profileId: number) => {
        try {
            setLoading(true);
            const res = await api.get(`/api/users/me/${profileId}`);
            console.log("-------profile data------", res);
            setData(res.data);
            setProfile(res.data.profile);
            setPosts(res.data.posts);
            setUser(res.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile(1);
    }, []);

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
                                            <PhotoOrFriendList title="Photos" />
                                        </div>
                                    </div>
                                </div>

                                {/* #------------ profile middle section start------------ */}
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <PostCreate
                                        avatarUrl={
                                            profile?.profilePictureUrl ||
                                            "/images/txt_img.png"
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
                                                            "Unknown User",
                                                        avatarUrl:
                                                            profile?.profilePictureUrl ||
                                                            "/images/Avatar.png",
                                                    }}
                                                    createdAt={
                                                        post.createdAt
                                                            ? new Date(
                                                                  post.createdAt
                                                              )
                                                            : new Date()
                                                    }
                                                    content={post.content || ""}
                                                    images={
                                                        post.imageUrl
                                                            ? [post.imageUrl]
                                                            : []
                                                    }
                                                    videos={
                                                        post.videoUrl
                                                            ? [post.videoUrl]
                                                            : []
                                                    }
                                                    stats={{
                                                        likes: 10,
                                                        comments: 2,
                                                    }}
                                                />
                                            ) : null
                                        )}
                                </div>

                                {/* #------------ profile right section end------------ */}
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                    <div className="_layout_right_wrap sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                                        <SuggestFrined />
                                        <PhotoOrFriendList title="Friends" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
