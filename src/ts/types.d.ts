/* Gallery Item */
export interface GalleryItem {
    id: string | number
    image: string
}

/* Product */
type AvailableProductCategory = "second-hands" | "new"

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
        price: string
        gallery: GalleryItem[]
    }
}

interface Received {
    id: string
    key: string
    title: string
    seller: {
        id: string
        classifierSizes: number[]
    }
    productData: {
        category: string
        price: string
        description: string
        image: string
        gallery: {
            id: string
            image: string
        }[]
    }
}[]

/* Gender */
export type Gender = "male" | "female"