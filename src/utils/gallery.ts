import { GalleryItem } from "../ts/types"

export function base64GalleryExtractor(galleryData: GalleryItem[]) {
    const galleryArr: string[] = []

    galleryData.map(item => galleryArr.push(item.image))

    return galleryArr
}