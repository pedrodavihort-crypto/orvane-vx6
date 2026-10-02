import type { ImgHTMLAttributes } from 'react';
import type { ImageAsset } from '../data/assets';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  image: ImageAsset;
  alt: string;
  /** sizes do <img>; padrão = largura total */
  sizes?: string;
  priority?: boolean;
}

/** <picture> com AVIF → WebP, duas larguras, lazy por padrão. */
export function Picture({ image, alt, sizes = '100vw', priority = false, className, ...rest }: Props) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${image.avifSm} 1200w, ${image.avif} 2400w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${image.webpSm} 1200w, ${image.webp} 2400w`} sizes={sizes} />
      <img
        src={image.webp}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        {...rest}
      />
    </picture>
  );
}
