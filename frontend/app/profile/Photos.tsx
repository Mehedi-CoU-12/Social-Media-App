export default function Photos({title,photos}:{title:string,photos:any[]}) {

    if(!photos || photos.length===0){
        return <div className="_left_inner_area_photos _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_left_inner_area_photo_content _mar_b24">
                <h4 className="_left_inner_area_photo_content_title _title5">
                    {title}
                </h4>
            </div>
            <p>No photos to display.</p>
        </div>;
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
                {photos && photos.length > 0 ? (
                    photos.map((item, index) => (
                        <div key={index} className="_left_inner_area_photos_box hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                src={item.imageUrl||"/images/photo_img1.png"}
                                alt="Image"
                                className="_photo_img"
                            />
                        </div>))
                        ) : (
                    <p>No items to display.</p>)}
            </div>
        </div>
    );
}
