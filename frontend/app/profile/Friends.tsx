export default function Friends({
    title,
    friends,
}: {
    title: string;
    friends: any[];
}) {
    if (!friends || friends.length === 0) {
        return (
            <div className="_left_inner_area_photos _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                <div className="_left_inner_area_photo_content _mar_b24">
                    <h4 className="_left_inner_area_photo_content_title _title5">
                        {title}
                    </h4>
                </div>
                <p>No friends to display.</p>
            </div>
        );
    }

    return (
        <div className="_left_inner_area_photos _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_left_inner_area_photo_content _mar_b24">
                <h4 className="_left_inner_area_photo_content_title _title5">
                    {title}
                </h4>
                <span className="_left_inner_area_photo_content_txt">
                    <a
                        className="_left_inner_area_photo_content_txt_link"
                        href="#0"
                    >
                        See All
                    </a>
                </span>
            </div>

            <div className="_left_inner_area_photos_area">
                {friends.map((item, index) => (
                    <div
                        key={index}
                        className="relative group hover:scale-105 transition-transform duration-300 ease-in-out _left_inner_area_photos_box"
                    >
                        {/* Tooltip name (above the image) */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                            {item.displayName || "Unknown User"}
                        </div>

                        <img
                            src={
                                item.profilePictureUrl || "/profile_image.webp"
                            }
                            alt={item.displayName || "Friend"}
                            className="_photo_img"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
