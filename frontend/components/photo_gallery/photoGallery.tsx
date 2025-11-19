'use client'

import Image from 'next/image'
import React from 'react'

export default function PhotoGallery({ images }: { images: string[] }) {
    const validImages = images.filter((img) => img && img.trim() !== '')

    if (validImages.length === 0) return null

    return (
        <div className="px-3 pb-3">
            {validImages.length === 1 ? (
                <div
                    className="position-relative"
                    style={{ width: '100%', height: 340 }}
                >
                    <Image
                        src={validImages[0]}
                        alt="Post image"
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover', borderRadius: 6 }}
                    />
                </div>
            ) : (
                <div className="row g-2">
                    {validImages.slice(0, 4).map((src, idx) => (
                        <div key={src + idx} className="col-6">
                            <div
                                className="position-relative"
                                style={{ width: '100%', height: 160 }}
                            >
                                <Image
                                    src={src}
                                    alt={`Post image ${idx + 1}`}
                                    fill
                                    sizes="50vw"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: 6,
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
