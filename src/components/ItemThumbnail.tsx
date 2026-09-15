import { itemImageSrc, type OfferItem } from "../config/offer";

interface ItemThumbnailProps {
  item: OfferItem;
  size?: "sm" | "md";
}

export default function ItemThumbnail({ item, size = "md" }: ItemThumbnailProps) {
  const dimensions =
    size === "sm"
      ? "h-12 w-12 sm:h-14 sm:w-14"
      : "h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20";

  return (
    <img
      src={itemImageSrc(item)}
      alt={item.imageAlt}
      width={80}
      height={80}
      draggable={false}
      loading="lazy"
      decoding="async"
      className={`${dimensions} shrink-0 rounded-xl border border-rule bg-parchment object-cover shadow-sm`}
    />
  );
}
