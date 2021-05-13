import React from 'react'
import { createContext, ReactNode, useContext, useState } from 'react'
import { GalleryItem } from '../ts/types'

interface ProductContext {
    products: Product[]
    productsManager: {
        updateProducts: (productId: itemId, update: any) => boolean
    }
}

interface ProductsProviderProps {
    children: ReactNode
}

type itemId = string | number

interface Product {
    id: itemId
    key: string
    title: string
    seller: {
        id: itemId
        classifierSizes: number[]
    }
    productData: {
        category: string
        price: string
        description: string
        image: string
        gallery: GalleryItem[]
    }
}

const ProductContext = createContext<ProductContext>({} as ProductContext)

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<Product[]>([])

    function updateProducts(productId: itemId, update: any) {
        try {
            products.forEach(product => {
                if (product.id == productId) {
                    const productIndex = products.indexOf(product)
                    products[productIndex] = { ...product, ...update }
                }
            })

            return true
        } catch (err) {
            console.log(err);
            return false
        }

    }

    return (
        <ProductContext.Provider
            value={{
                products,
                productsManager: {
                    updateProducts
                }
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    const { products, productsManager } = context
    return { products, productsManager }
}