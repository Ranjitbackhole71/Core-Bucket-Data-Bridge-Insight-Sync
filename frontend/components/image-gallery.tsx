"use client"

interface ImageItem {
  src: string
  alt: string
  title?: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  className?: string
}

export function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover group-hover:opacity-75"
            />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {image.title || image.alt}</span>
            </button>
          </div>
          {image.title && (
            <p className="mt-2 block text-sm font-medium text-gray-900 dark:text-white truncate pointer-events-none">
              {image.title}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}