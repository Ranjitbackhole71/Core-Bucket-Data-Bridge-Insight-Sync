"use client"

interface VideoPlayerProps {
  src: string
  title?: string
  className?: string
}

export function VideoPlayer({ src, title, className = "" }: VideoPlayerProps) {
  return (
    <div className={`relative pb-[56.25%] h-0 ${className}`}>
      <iframe
        src={src}
        title={title}
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}