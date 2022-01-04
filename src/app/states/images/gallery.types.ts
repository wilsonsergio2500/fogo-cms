
export type GalleryType = "images" | "store"
export type CmsGalleryTypes = { [m in GalleryType]: GalleryType };
export const CMS_GALLERY: CmsGalleryTypes = { images: "images", store: "store" };
