"use client";

import React, { useCallback, useState } from "react";

export type PostCreateProps = {
    avatarUrl?: string;
    onSubmit?: (text: string) => void | Promise<void>;
    disabled?: boolean;
    className?: string;
};

export default function PostCreate({
    avatarUrl = "/images/profile-1.png",
    onSubmit,
    disabled,
    className,
}: PostCreateProps) {
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handlePost = useCallback(async () => {
        if (!text.trim() || disabled || submitting) return;
        try {
            setSubmitting(true);
            await onSubmit?.(text.trim());
            setText("");
        } finally {
            setSubmitting(false);
        }
    }, [text, onSubmit, disabled, submitting]);

    const canPost = !!text.trim() && !disabled && !submitting;

    return (
        <div
            className={`_feed_inner_text_area _b_radious6 _padd_t24 _padd_b6 _padd_r24 _padd_l24 ${
                className ?? ""
            }`.trim()}
        >
            <div className="_feed_inner_text_area_box">
                <div className="_feed_inner_text_area_box_image _mar_r16">
                    <img
                        src={avatarUrl}
                        alt="Your avatar"
                        className="_txt_img"
                        width={40}
                        height={40}
                    />
                </div>
                <div className="_feed_inner_text_area_box_form">
                    <textarea
                        id="post_textarea"
                        className="form-control _textarea"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={3}
                        aria-label="Create post"
                    />
                </div>
            </div>

            <div className="_feed_inner_text_area_bottom">
                <div className="_feed_inner_text_area_item">
                    <button
                        type="button"
                        className="_feed_inner_text_area_bottom_photo_link _feed_common"
                        aria-label="Add photo"
                    >
                        <svg
                            className="_mar_img"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <path
                                d="M1 4.5A2.5 2.5 0 013.5 2h11A2.5 2.5 0 0117 4.5v9A2.5 2.5 0 0114.5 16h-11A2.5 2.5 0 011 13.5v-9z"
                                stroke="#666"
                            />
                            <path d="M6.5 9.5l2-2 4 4" stroke="#666" />
                            <circle cx="5" cy="6" r="1" fill="#666" />
                        </svg>
                        <span>Photo</span>
                    </button>
                </div>
                <div className="_feed_inner_text_area_btn">
                    <button
                        type="button"
                        className="_feed_inner_text_area_btn_link"
                        onClick={handlePost}
                        disabled={!canPost}
                        aria-disabled={!canPost}
                        aria-label="Post"
                        title={canPost ? "Post" : "Enter something to post"}
                    >
                        <svg
                            className="_mar_img"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="13"
                            fill="none"
                            viewBox="0 0 14 13"
                        >
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Post</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
