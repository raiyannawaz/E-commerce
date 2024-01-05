import React from 'react'
import WishlistItem from './WishlistItem'

export default function WishlistItems({ products, handleWishlist, handleCart }) {
    let wishlistItems = products.filter((product) => {
        return product.listed.wishlisted
    })
    return (
        <>
            {wishlistItems.length === 0 ?
                <div className="wishlist-container">
                    <h2>No Items</h2>
                    <a href="/collections"><button className='px-3'>Shop Now</button></a>
                </div>
                :
                <div className="container py-lg-4 py-3 collections">
                    <div className="row g-lg-4 g-2">
                        {wishlistItems.map((wishlistItem) => {
                            return <div className="col-lg-3 col-md-4 col-6" key={wishlistItem.id}>
                                <WishlistItem wishlistItem={wishlistItem} handleWishlist={handleWishlist} handleCart={handleCart}/>
                            </div>
                        })}
                    </div>
                </div>
            }
        </>
    )
}
