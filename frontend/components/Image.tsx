import Image from "next/image";
export default function ImageComponents({
    src = "/images/Avatar.png",
    alt,
    className,
    width = 40,
    height = 40,
}: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}) {
    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
        />
    );
}
