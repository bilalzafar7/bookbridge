"use client";

type Props = { image: string; title: string };

export function BookGallery({ image, title }: Props) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/80">
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary listing image URLs */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
        loading="eager"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
