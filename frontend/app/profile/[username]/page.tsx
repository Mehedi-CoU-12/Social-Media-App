"user client";
import PostCard from "@/components/PostCard";
import PostCreate from "@/components/PostCreate";
import IntroductionSection from "../IntroductionSection";
import PhotoOrFriendList from "../PhotoOrFriendList";
import SuggestFrined from "../../../components/SuggestFrined";
import ProfileAndCoverPhoto from "../ProfileAndCoverPhoto";
import Header from "@/components/Header";

export default function ProfilePage() {
    return (
        <div className="_layout _layout_main_wrapper">
            <Header />
            <div className="_profile_wrapper">
                <div className="_profile_wrap">
                    <div className="container">
                        {/* #--------- profile photo and cover photo section start----------*/}
                        <ProfileAndCoverPhoto />
                        <div className="_layout_inner_wrap_area">
                            <div className="row">
                                {/* #------------ profile left section start------------ */}
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                    <div className="_layout_left_wrap">
                                        <div className="_layout_left_sidebar_inner">
                                            <IntroductionSection />
                                            <PhotoOrFriendList />
                                        </div>
                                    </div>
                                </div>

                                {/* #------------ profile middle section start------------ */}
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <PostCreate
                                        avatarUrl="/images/txt_img.png"
                                        // onSubmit={handleCreatePost}
                                    />
                                    <PostCard
                                        author={{
                                            name: "Alice",
                                            avatarUrl: "/images/profile-1.png",
                                        }}
                                        createdAt={new Date()}
                                        content={"Hello feed!"}
                                        images={["/images/img1.png"]}
                                        stats={{ likes: 10, comments: 2 }}
                                    />
                                </div>

                                {/* #------------ profile right section end------------ */}
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                    <div className="_layout_right_wrap">
                                        <SuggestFrined />
                                        <PhotoOrFriendList />
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
