import Header from "@/components/Header";
import Image from "next/image";
import SuggestFrined from "../components/SuggestFrined";
import Explore from "@/components/Explore";
import YouMightLike from "@/components/YouMightLike";
import Events from "@/components/Events";
import FriendLists from "@/components/FriendLists";
import Story from "@/components/Story";
import PostCreate from "@/components/PostCreate";
import PostCard from "@/components/PostCard";

export default function Home() {
    return (
        <div className="_layout _layout_main_wrapper">
            <div className="_main_layout">
                {/* <!--Desktop Menu Start--> */}
                <Header />
                {/* <!--Desktop Menu End-->
                {/* <!-- Mobile Bottom Navigation End --> */}
                <div className="_container_fluid_custom">
                    <div className="_layout_inner_wrap p-0 _layout_inner_wrap1">
                        {/* <!-- For Different Pages --> */}
                        <div className="_layout_top_full d-none">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12"></div>
                            </div>
                        </div>
                        {/* <!-- For Different Pages -->
					<!-- Main Layout Structure --> */}
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
                                        <PostCard
                                            author={{
                                                name: "Alice",
                                                avatarUrl:
                                                    "/images/profile-1.png",
                                            }}
                                            createdAt={new Date()}
                                            content={"Hello feed!"}
                                            images={["/images/img1.png"]}
                                            stats={{ likes: 10, comments: 2 }}
                                        />
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
    );
}
