/* Gallery Item */
export interface GalleryItem {
    id: string | number
    image: string
}

/* Product */
export interface Product {
    id: string
    key: string
    title: string
    seller: {
        id: string
        classifierSizes: number[]
    },
    productData: {
        category: string
        description: string
        image: string
        gallery: GalleryItem[]
    }
}