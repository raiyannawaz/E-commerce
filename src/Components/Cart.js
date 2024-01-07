import React, { useEffect, useState } from 'react'
import CartItems from './CartItems'
import { Link } from 'react-router-dom';

export default function Cart({showAlert, showFinalAlert, setWhiteScreen, products, setProducts, handleWishlist, handleCart }) {

    let cartItems = products.filter((product) => {
        return product.listed.cartlisted
    })

    let itemPrices = cartItems.length > 0 ? cartItems.map((product) => {
        return product.price * product.listed.cart.quantity
    }) : 0;

    let totalItemsPrice = itemPrices.length > 0 ? itemPrices.reduce((accumulator, curVal) => {
        return accumulator + curVal
    }) : 0;

    let shippingCharge = totalItemsPrice > 0 ? 100 : 0;

    const [popUpQty, setPopUpQty] = useState(null)

    const [obj, setObj] = useState();

    const handleQty = (e, product) => {

        let target = e.target

        if (target.value === '5+') {
            setPopUpQty(true)
            setObj({ select: target, product: product })
        }
        else {
            for (let i = 0; i < products.length; i++) {
                if (product.id === products[i].id) {
                    products[i].listed.cart.quantity = target.value
                }
            }
            localStorage.setItem('miuItems', JSON.stringify(products))
            let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
            setProducts(updatedLocalItems)
            showAlert('Item Updated', <i className="ms-2 fa fa-thumbs-up"></i>, 'primary')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let target = e.target.parentElement.parentElement;

        let value = target.querySelector('#qty').value;

        if (value > 5) {
            let select = obj.select;
            let product = obj.product;
            let options = select.querySelectorAll('option')

            options.forEach((option) => {
                if (option.textContent === '5+') {
                    option.textContent = value;
                    for (let i = 0; i < products.length; i++) {
                        if (product.id === products[i].id) {
                            setTimeout(() => {
                                select.value = value
                            })
                            products[i].listed.cart.quantity = value
                        }
                    }
                    localStorage.setItem('miuItems', JSON.stringify(products))
                    let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
                    setProducts(updatedLocalItems)
                    setPopUpQty(null)
                    showAlert('Item Updated', <i className="ms-2 fa fa-thumbs-up"></i>, 'primary')
                }
            })
        }
        else {
            showAlert('Value Must Be Greater Than 5', <i className="ms-2 fa-solid fa-exclamation"></i>, 'warning')
        }
    }

    const handleSize = (e, product) => {
        let target = e.target;
        for (let i = 0; i < products.length; i++) {
            if (product.id === products[i].id) {
                product.listed.cart.selectedSize = target.value
            }
            localStorage.setItem('miuItems', JSON.stringify(products))
            let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
            setProducts(updatedLocalItems)
            showAlert('Item Updated', <i className="ms-2 fa fa-thumbs-up"></i>, 'primary')
        }
    }

    const [textParam, setTextParam] = useState('dark')
    const [codeMsg, setCodeMsg] = useState('Code is MIU50')
    const [isApplied, setIsApplied] = useState(false)

    useEffect(() => {
        let code = document.querySelector('#code')
        if (totalItemsPrice + shippingCharge < 2500) {
            setIsApplied(false)
            code.value = ''
        }
    }, [totalItemsPrice, shippingCharge])

    const applyCode = (e) => {
        e.preventDefault();

        let code = document.querySelector('#code')
        if (totalItemsPrice + shippingCharge > 2500) {
            if (code.value === 'MIU50') {
                setCodeMsg('Code is valid')
                setTextParam('success')
                setIsApplied(true)
                showAlert('Promo Applied', <i className='ms-2 fa fa-check'></i>, 'success')
                e.target.classList.remove('show')
            }
            else if (code.value !== 'MIU50') {
                setCodeMsg('Invalid Code')
                setTextParam('danger')
            }
            else {
                setCodeMsg('Please Write Something')
                setTextParam('danger')
            }
        }
        else if (cartItems.length === 0) {
            showAlert('Please Add Items', <i className='ms-2 fa-solid fa-exclamation'></i>, 'danger')
        }
        else {
            showAlert('Your Purchasing Amount Must Be Greather Than Rs.2500', <i className='ms-2 fa fa-exclamation'></i>, 'danger')
        }
    }

    const [addresses, setAddresses] = useState({ add1: '', add2: '', add3: '', add4: '', add5: '', add6: '' })

    const [addressAdded, setAddressAdded] = useState(false)

    const handleAddress = (e) => {

        e.preventDefault()

        if (addresses.add1 && addresses.add2 && addresses.add3 && addresses.add4 && addresses.add5 && addresses.add6) {
            if (!addressAdded) {
                setAddressAdded(true)
                showAlert('Address Added', <i className='ms-2 fa fa-check'></i>, 'primary')
            }
            else {
                showAlert('Address Updated', <i className='ms-2 fa fa-check'></i>, 'primary')
            }
        }
        else {
            showAlert(`Please Dont Leave Any Input Empty`, <i className="ms-2 fa-solid fa-exclamation"></i>, 'warning')
        }
    }

    const handleFormAddresss = (e) => {
        setAddresses({ ...addresses, [e.target.name]: e.target.value })
    }

    const placeOrder = () => {
        if (cartItems.length === 0) {
            showAlert('Please Add Items', <i className="ms-2 fa-solid fa-exclamation"></i>, 'danger')
        }
        else if (totalItemsPrice <= 1000) {
            showAlert('Purchasing Amount Must Be Greater Than Rs.1000', <i className="ms-2 fa-solid fa-exclamation"></i>, 'danger')
        }
        else if (!addressAdded) {
            showAlert('Please Add Address', <i className="ms-2 fa-solid fa-exclamation"></i>, 'warning')
        }
        else {
            showFinalAlert('Please Wait.....', <div class="ms-2 spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div>, 'primary')
            setWhiteScreen(true)

            setTimeout(() => {
                showAlert('To Deliver', <i className='ms-2 fa fa-shipping-fast'></i>, 'primary')

                setTimeout(() => {
                    showAlert(`${addresses.add1}, ${addresses.add2}, ${addresses.add3}, ${addresses.add4}, ${addresses.add5}, ${addresses.add6}`, '', 'primary py-2',)

                    setTimeout(() => {
                        showFinalAlert('Ordered Successfully', <i className='ms-2 fa fa-circle-check'></i>, 'success')

                        setTimeout(()=>{
                            for (let i = 0; i < products.length; i++) {
                                products[i].listed.cart.quantity = 0;
                                products[i].listed.cartlisted = false
    
                                localStorage.setItem('miuItems', JSON.stringify(products))
                                let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
                                setProducts(updatedLocalItems)
                            }
                            setWhiteScreen(false)
                            setIsApplied(false)
                            setAddressAdded(false)
                        }, 3000)
                        
                    }, 3000)

                }, 3000);

            }, 5000);

        }
    }

    return (
        <div className="container mt-3 cart pb-lg-0 pb-3">
            <div className="row gx-3">
                <div className="col-lg-8 col-md-8 col-12 mx-auto">
                    <div className="cart-left-div pb-3">
                        <div className="cart-heading p-3 shadow d-flex justify-content-between align-items-center">
                            <h3 className='m-0'>{cartItems.length === 1 ? `(${cartItems.length} Item)` : `(${cartItems.length} Items)`}</h3>
                            <button className='px-3' data-bs-toggle="modal" data-bs-target="#exampleModal">{addressAdded ? 'Edit Address' : 'Add Address'}</button>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Address</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="" method='post' onSubmit={handleAddress}>
                                        <div className="modal-body">
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" name='add1' value={addresses.add1} onChange={handleFormAddresss} placeholder='Flat No / House No / Apartment' />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" name='add2' value={addresses.add2} onChange={handleFormAddresss} placeholder='Street / Colony / Area' />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" name='add3' value={addresses.add3} onChange={handleFormAddresss} placeholder='Town / Village' />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" name='add4' value={addresses.add4} onChange={handleFormAddresss} placeholder='City / District' />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" name='add5' value={addresses.add5} onChange={handleFormAddresss} placeholder='State / Provision' />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name='add6' value={addresses.add6} onChange={handleFormAddresss} placeholder='Country' />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" data-bs-target={addresses.add1 && addresses.add2 && addresses.add3 && addresses.add4 && addresses.add5 && addresses.add6 ? '#exampleModal' : ''} data-bs-toggle={addresses.add1 && addresses.add2 && addresses.add3 && addresses.add4 && addresses.add5 && addresses.add6 ? 'modal' : ''} id='saveBtn' className='px-2'>Save changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {cartItems.length === 0 ? <div className="cart-container bg-white mt-3 shadow">
                            <h2>No Items</h2>
                            <Link href="/collections"><button className='px-3'>Shop Now</button></Link>
                        </div> : cartItems.map((cartItem) => {
                            return <CartItems key={cartItem.id} cartItem={cartItem} popUpQty={popUpQty} setPopUpQty={setPopUpQty} onSubmit={onSubmit} handleWishlist={handleWishlist} handleCart={handleCart} handleQty={handleQty} handleSize={handleSize} />
                        })}
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-11 mx-auto order-sum">
                    {addressAdded && isApplied ? <div className="container-div">
                        <div className="p-3 bg-white shadow mb-3">
                            <h4>Deliver To <i className='fa fa-shipping-fast'></i></h4>
                            <p>{addresses.add1}, {addresses.add2}, {addresses.add3}, {addresses.add4}, {addresses.add5}, {addresses.add6}</p>
                        </div>
                    </div> : ''}
                    <div className="container-div">
                        <div className="px-3 py-2 w-100 shadow bg-white promo-code">
                            <p style={{ cursor: 'pointer' }} data-bs-target={isApplied ? '' : '#promoCode'} data-bs-toggle={isApplied ? '' : 'collapse'} className={`py-1 mb-0 fs-5 d-flex justify-content-between ${isApplied ? 'text-success' : ''}`}>
                                <span>{isApplied ? 'Applied' : 'Apply Promo Code'}</span>
                                <span>{isApplied ? <i className='fa fa-check'></i> : <i className='fa fa-chevron-down'></i>}</span>
                            </p>
                            <form className="collapse" id='promoCode' onSubmit={applyCode}>
                                <div className="form-group w-75 pt-2">
                                    <input type="text" id='code' disabled={isApplied} className="form-control" />
                                </div>
                                <button type='submit' disabled={isApplied} className='mt-3 mb-1' id='codeBtn'>Apply Code</button>
                                <p className={`mb-0 py-2 text-${textParam}`} id='codeMsg'>{codeMsg}</p>
                            </form>
                        </div>
                    </div>
                    <div className="container-div">
                        <div className="px-3 py-4 w-100 shadow mt-3">
                            <h3>Order Summary</h3>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className='mb-2'>Product Amount</p>
                                <p className='mb-2'>₹{isApplied && totalItemsPrice + shippingCharge > 2500 ? totalItemsPrice - 500 : totalItemsPrice}.00</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className='m-0'>Shipping Charge</p>
                                <p className='m-0'>₹{shippingCharge}.00</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h4 className='mb-1'>Total Amount</h4>
                                <h4 className='mb-1'>₹{isApplied && totalItemsPrice + shippingCharge > 2500 ? totalItemsPrice + shippingCharge - 500 : totalItemsPrice + shippingCharge}.00</h4>
                            </div>
                            <div className="mt-2 w-100 d-flex justify-content-end place-order">
                                <button className='px-3' onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
