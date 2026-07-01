type GalleryPhoto = {
  src: string;
  h: number;
};

type GalleryGridProps = {
  photos: GalleryPhoto[];
  onPhotoClick: () => void;
};

export function GalleryGrid({ photos, onPhotoClick }: GalleryGridProps) {
  return (
    <div className="masonry">
      {photos.map((p, i) => (
        <img
          key={i}
          className="m-photo"
          style={{ height: p.h }}
          src={p.src}
          alt=""
          onClick={onPhotoClick}
        />
      ))}
    </div>
  );
}
