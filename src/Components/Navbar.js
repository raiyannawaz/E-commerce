import React from 'react'
import logo from '../Img/logo.png'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({products}) {

    let wishlistLength = products.filter((product)=>{
        return product.listed.wishlisted
    }).length

    let cartlistLength = products.filter((product)=>{
        return product.listed.cartlisted
    }).length
    
    let location = useLocation('')

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/' className='navbar-brand'><img src={logo} className='img-fluid p-0' style={{ height: '35px' }} alt="" /></Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/collections' ? 'active' : ''}`} to="/collections">Collections</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-center align-items-center right-nav position-absolute end-0 pe-3">
                    <Link to="/wishlist" className=' text-dark position-relative me-3'>
                        <i className='fa fa-heart'>
                            {wishlistLength === 0 || wishlistLength === undefined ? '' : <span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-primary">
                                {wishlistLength}
                                <span className="visually-hidden">unread messages</span>
                            </span>}
                        </i>
                    </Link>
                    <Link to="/cart" className=' text-dark position-relative me-3'>
                        <i className='fa fa-shopping-cart'>
                        {cartlistLength === 0 ? '' : <span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-primary">
                                {cartlistLength}
                                <span className="visually-hidden">unread messages</span>
                            </span>}
                        </i>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
