import React, { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  blurHash?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const BlurImage: React.FC<BlurImageProps> = ({
  src,
  blurHash,
  alt,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* BlurHash Placeholder */}
      {blurHash && !isLoaded && (
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <Blurhash
            hash={blurHash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={24}
            punch={1}
          />
        </div>
      )}

      {/* Main Image with smooth fade-in */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`relative z-10 transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
