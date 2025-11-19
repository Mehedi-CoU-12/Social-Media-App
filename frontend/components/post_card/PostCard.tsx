'use client'

import Image from 'next/image'
import React from 'react'
import PhotoGallery from '../photo_gallery/photoGallery'
import VideoGallery from '../video_gallery/videoGallery'

export type PostCardProps = {
    author: {
        name?: string
        avatarUrl?: string
        username?: string
    }
    post: {
        content?: string
        createdAt?: string | Date
        imageUrl?: string
        videoUrl?: string
        images?: string[]
        videos?: string[]
    }
}

function formatTime(t: string | Date): string {
    try {
        const d = typeof t === 'string' ? new Date(t) : t
        if (Number.isNaN(d.getTime())) return String(t)
        return d.toLocaleString()
    } catch {
        return String(t)
    }
}

export default function PostCard({ author, post }: PostCardProps) {
    const likes = 0
    const comments = 0
    const shares = 0

    if (!post) {
        return null
    }

    const images = post.imageUrl ? [post.imageUrl] : []
    const videos = post.videoUrl ? [post.videoUrl] : []

    return (
        <article className="_feed_inner_timeline_post_area mb-4 _b_radious6 _bg_white">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between p-3">
                <div className="d-flex align-items-center gap-2">
                    {/* Avatar */}
                    <div
                        style={{ width: 40, height: 40, position: 'relative' }}
                    >
                        <Image
                            src={author.avatarUrl || '/profile_image.webp'}
                            alt={`${author.name} avatar`}
                            fill
                            sizes="40px"
                            className="_txt_img"
                        />
                    </div>
                    <div>
                        <h6
                            className="_feed_inner_timeline_post_box_title m-0"
                            style={{ lineHeight: 1.2 }}
                        >
                            {author.name}
                            {author.username ? (
                                <span style={{ color: '#666', marginLeft: 6 }}>
                                    @{author.username}
                                </span>
                            ) : null}
                        </h6>
                        <p
                            className="_feed_inner_timeline_post_box_para m-0"
                            style={{ fontSize: 12 }}
                        >
                            {formatTime(post.createdAt)}
                        </p>
                    </div>
                </div>
                {/* Placeholder for more menu */}
                <button
                    type="button"
                    className="btn btn-link p-0"
                    aria-label="More options"
                >
                    <svg
                        width="4"
                        height="16"
                        viewBox="0 0 4 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                        <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                        <circle cx="2" cy="14" r="2" fill="#C4C4C4" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="px-3 pb-2">
                <p
                    className="_feed_inner_timeline_post_title m-0"
                    style={{ whiteSpace: 'pre-wrap' }}
                >
                    {post.content}
                </p>
            </div>

            {/* Images and Videos*/}
            <PhotoGallery images={images} />
            <VideoGallery videos={videos} />

            {/* Reactions summary */}
            <div
                className="d-flex justify-content-between align-items-center px-3"
                style={{ paddingBottom: 6 }}
            >
                <p className="_feed_inner_timeline_total_reacts_para1 m-0">
                    <span>{likes}</span> Likes
                </p>
                <p className="_feed_inner_timeline_total_reacts_para2 m-0">
                    <span>{comments}</span> Comments • <span>{shares}</span>{' '}
                    Shares
                </p>
            </div>

            {/* Reaction actions */}
            <div className="_feed_inner_timeline_reaction px-2 py-2">
                <div className="d-flex justify-content-around">
                    <button
                        type="button"
                        className="_feed_inner_timeline_reaction_link btn btn-link"
                        // onClick={onLike}
                    >
                        <span
                            className="_reaction_svg"
                            style={{ marginRight: 6 }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 16s-6-3.33-6-8a3.5 3.5 0 016-2.45A3.5 3.5 0 0115 8c0 4.67-6 8-6 8z"
                                    stroke="#666"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                        </span>
                        Like
                    </button>
                    <button
                        type="button"
                        className="_feed_inner_timeline_reaction_link btn btn-link"
                        // onClick={onComment}
                    >
                        <span
                            className="_reaction_svg"
                            style={{ marginRight: 6 }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 3h12v8H9l-4 4v-4H3V3z"
                                    stroke="#666"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                        </span>
                        Comment
                    </button>
                    <button
                        type="button"
                        className="_feed_inner_timeline_reaction_link btn btn-link"
                        // onClick={onShare}
                    >
                        <span
                            className="_reaction_svg"
                            style={{ marginRight: 6 }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 5l-8 4 8 4V5z"
                                    stroke="#666"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                        </span>
                        Share
                    </button>
                </div>
            </div>
        </article>
    )
}
