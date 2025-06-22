"use client";

import Image from "next/image";
import {useState} from "react";

interface Props {
    src: string;
    placeholder: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export default function AnimatedImage({src, placeholder, alt, width, height, className}: Props) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={className}>
            {isLoaded ?
                <Image src={src} alt={alt} width={width} height={height} unoptimized className="img-fluid" /> :
                <Image src={placeholder} alt={alt} width={width} height={height} style={{filter: "blur(3px)"}}
                       onLoad={() => setIsLoaded(true)} className="img-fluid" />
            }
        </div>
    );
}
