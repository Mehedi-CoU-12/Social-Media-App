'use client'

import React from 'react'

export default function VideoGallery({ videos }: { videos: string[] }) {
    const validVideos = videos.filter((v) => v && v.trim() !== '')

    if (validVideos.length === 0) return null

    return (
        <div className="px-3 pb-3">
            {validVideos.length === 1 ? (
                <div className="position-relative" style={{ width: '100%' }}>
                    <video
                        src={validVideos[0]}
                        controls
                        style={{
                            width: '100%',
                            maxHeight: 360,
                            borderRadius: 6,
                            objectFit: 'cover',
                            backgroundColor: '#000',
                        }}
                    />
                </div>
            ) : (
                <div className="row g-2">
                    {validVideos.slice(0, 4).map((src, idx) => (
                        <div key={src + idx} className="col-6">
                            <div
                                className="position-relative"
                                style={{ width: '100%', height: 160 }}
                            >
                                <video
                                    src={src}
                                    controls
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 6,
                                        objectFit: 'cover',
                                        backgroundColor: '#000',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
