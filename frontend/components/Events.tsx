"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Events() {
    const router = useRouter();

    const handleCardKeyDown = (e: any, href: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(href);
        }
    };

    return (
        <div className="_layout_left_sidebar_inner">
            <div className="_left_inner_area_event _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                <div className="_left_inner_event_content">
                    <h4 className="_left_inner_event_title _title5">Events</h4>
                    <Link href="/" className="_left_inner_event_link">
                        See all
                    </Link>
                </div>

                {/* Card 1: outer wrapper is a clickable div to avoid nested anchors */}
                <div
                    className="_left_inner_event_card_link"
                    role="link"
                    tabIndex={0}
                    onClick={() => router.push("/")}
                    onKeyDown={(e) => handleCardKeyDown(e, "/")}
                >
                    <div className="_left_inner_event_card">
                        <div className="_left_inner_event_card_iamge">
                            <img
                                src="/images/feed_event1.png"
                                alt="Image"
                                className="_card_img"
                            />
                        </div>
                        <div className="_left_inner_event_card_content">
                            <div className="_left_inner_card_date">
                                <p className="_left_inner_card_date_para">10</p>
                                <p className="_left_inner_card_date_para1">
                                    Jul
                                </p>
                            </div>
                            <div className="_left_inner_card_txt">
                                <h4 className="_left_inner_event_card_title">
                                    No more terrorism no more cry
                                </h4>
                            </div>
                        </div>
                        <hr className="_underline" />
                        <div className="_left_inner_event_bottom">
                            <p className="_left_iner_event_bottom">
                                17 People Going
                            </p>
                            {/* inner Link remains an actual anchor (no nesting now) */}
                            <Link
                                href="/"
                                className="_left_iner_event_bottom_link"
                            >
                                Going
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card 2: same treatment, navigate to event-single.html */}
                <div
                    className="_left_inner_event_card_link"
                    role="link"
                    tabIndex={0}
                    onClick={() => router.push("/event-single.html")}
                    onKeyDown={(e) =>
                        handleCardKeyDown(e, "/event-single.html")
                    }
                >
                    <div className="_left_inner_event_card">
                        <div className="_left_inner_event_card_iamge">
                            <img
                                src="/images/feed_event1.png"
                                alt="Image"
                                className="_card_img"
                            />
                        </div>
                        <div className="_left_inner_event_card_content">
                            <div className="_left_inner_card_date">
                                <p className="_left_inner_card_date_para">10</p>
                                <p className="_left_inner_card_date_para1">
                                    Jul
                                </p>
                            </div>
                            <div className="_left_inner_card_txt">
                                <h4 className="_left_inner_event_card_title">
                                    No more terrorism no more cry
                                </h4>
                            </div>
                        </div>
                        <hr className="_underline" />
                        <div className="_left_inner_event_bottom">
                            <p className="_left_iner_event_bottom">
                                17 People Going
                            </p>
                            <Link
                                href="/"
                                className="_left_iner_event_bottom_link"
                            >
                                Going
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
