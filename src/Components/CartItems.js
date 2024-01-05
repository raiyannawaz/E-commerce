import React from 'react'

export default function CartItems({ cartItem, productPrice, setProductPrice, popUpQty, setPopUpQty, onSubmit, handleWishlist, handleCart, handleQty, handleSize }) {

    let { id, title, desc, image, price, listed } = cartItem;

    let quantities = [1,2,3,4,5,listed.cart.quantity > 5 ? listed.cart.quantity : '5+']


    return (
        <div className="cart-item mt-3 bg-white shadow h-100 py-lg-0 py-2" key={id}>
            <div className="row gx-lg-auto gx-0">
                <div className="col-lg-3 col-4">
                    <img src={image} className='img-fluid' alt="" />
                </div>
                <div className="col-lg-9 col-8">
                    <div className="d-flex flex-column justify-content-center h-100 cart-item-info py-lg-0">
                        <h4 className='m-0 pb-lg-2 pb-1 title'>{title}</h4>
                        <p className='m-0 text-muted pb-lg-2 pb-1 desc'>{desc}</p>
                        <div className="d-flex pb-lg-2 pb-1 event">
                            <p className='m-0 text-primary' data-id='add' onClick={(e) => { handleWishlist(e, cartItem)}}>Move To Wishlist <i className='fa fa-heart'></i></p>
                            <p className='m-0 ms-3 text-danger' onClick={(e) => { handleCart(e, cartItem)}}>Move To Trash <i className='fa fa-trash'></i></p>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="cart-select me-lg-5 me-3 py-lg-1 px-lg-2 quantities">
                                {popUpQty ? <div className='pop-up-container'>
                                    <form className="pop-up shadow" method='post' onSubmit={onSubmit}>
                                        <div className="pop-up-div-1">
                                            <h3 className='m-0'>Enter The Quantity</h3>
                                        </div>
                                        <div className="pop-up-div-2 d-flex  align-items-center">
                                            <input type="number" name="quantity" id="qty" />
                                        </div>
                                        <div className="pop-up-div-3 d-flex align-items-center">
                                            <button type='reset' className='w-50' onClick={() => { setPopUpQty(null) }}>Cancel</button>
                                            <button type='submit' onClick={onSubmit} className='w-50'>Ok</button>
                                        </div>
                                    </form>
                                </div> : ''}
                                Qty:<select name="quantity" id="quantity" onChange={((e)=>{handleQty(e, cartItem)})} defaultValue={listed.cart.quantity}>
                                    {quantities.map((quantity)=>{
                                        return <option key={quantity}>{quantity}</option>
                                    })}
                                </select>
                            </div>
                            {cartItem.sizeAvailable ? <div className="cart-select py-lg-1 px-lg-2 sizes">
                                Size: <select name="sizes" id="size" onChange={((e)=>{handleSize(e, cartItem)})} defaultValue={listed.cart.selectedSize}>
                                    {cartItem.sizeAvailable.map((size) => {
                                        return <option key={size}>{size}</option>
                                    })}
                                </select> </div> : ''}
                            <h3 className='ms-auto mb-0 me-3'>₹<span className='price'>{price*listed.cart.quantity}</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
