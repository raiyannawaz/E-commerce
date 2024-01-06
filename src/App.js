import './App.css';
import Navbar from './Components/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Collections from './Components/Collections';
import img1 from '../src/Img/analogwatch.jpg'
import img2 from '../src/Img/smartwatch.webp'
import img3 from '../src/Img/boots.jpg'
import img4 from '../src/Img/shoes.jpg'
import img5 from '../src/Img/pant.jpg'
import img6 from '../src/Img/jeans.avif'
import img7 from '../src/Img/hoodie.webp'
import img8 from '../src/Img/leatherjacket.jpg'
import img9 from '../src/Img/pufferjacket.jpg'
import img10 from '../src/Img/casualjacket.webp'
import img11 from '../src/Img/shirt.jpg'
import img12 from '../src/Img/tshirt.jpg'
import { useState } from 'react';
import WishlistItems from './Components/WishlistItems';
import Product from './Components/Product';
import Cart from './Components/Cart';
import Alert from './Components/Alert';
import WhiteScreen from './Components/WhiteScreen';

function App() {

  let items = [
    {
      id: 1,
      title: "Analog Watch",
      actualPrice: 3500,
      category: "accessories",
      color: "Brown",
      desc: "Brown/Black Analog Watch For Men With Leather Strap",
      image: img1,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0 } },
      dialType: "Analog",
      strapType: "Leather",
      price: 2500,
      rating: 4,
      type: "Analog Watch"
    },
    {
      id: 2,
      title: "Smart Watch",
      actualPrice: 6500,
      category: "accessories",
      color: "Black",
      desc: "Smart Watch For Men With Multiple Facility",
      image: img2,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0 } },
      dialType: "Smart",
      strapType: "Rubber",
      price: 4500,
      rating: 2.9,
      type: "Smart Watch"
    },
    {
      id: 3,
      title: "Leather Boots",
      actualPrice: 3500,
      category: "foot-wear",
      color: "Brown",
      desc: "Brown Leather Boots For Men",
      image: img3,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [6, 7, 8, 9],
      material: "Leather",
      occasion: "Formal/Casual",
      price: 2500,
      rating: 3.8,
      type: "Boots",
      fastening: 'Lace-up',
      ankleHeight: 'Mid-Top',
      soleMaterial: 'Leather'
    },
    {
      id: 4,
      title: "Oxford Shoes",
      actualPrice: 3000,
      category: "foot-wear",
      color: "Black",
      desc: "Black Leather Shoes For Men",
      image: img4,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [6, 7, 8, 9],
      material: "Leather",
      occasion: "Formal",
      price: 2000,
      rating: 3.2,
      type: "Formal Shoes",
      ankleHeight: 'Regular',
      fastening: 'Lace-up',
      soleMaterial: 'Leather'
    },
    {
      id: 5,
      title: "Formal Pant",
      actualPrice: 2800,
      category: "bottom-wear",
      color: "Biege",
      desc: "Black Cotton Pant For Men",
      image: img5,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [28, 30, 32, 34],
      material: "Cotton",
      occasion: "Formal",
      price: 1500,
      rating: 2.1,
      type: "Cotton Pant",
      length: 'Regular ',
      shade: 'Normal',
      waistRise: 'Mid-Rise'
    },
    {
      id: 6,
      title: "Jeans Pant",
      actualPrice: 3500,
      category: "bottom-wear",
      color: "Blue",
      desc: "Blue Jeans Pant For Men",
      image: img6,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [28, 30, 32, 34],
      material: "Denim",
      occasion: "Casual",
      price: 2500,
      rating: 3.1,
      type: "Denim Pant",
      length: 'Regular ',
      shade: 'Normal',
      waistRise: 'Mid-Rise'
    },
    {
      id: 7,
      title: "Hoodie For Men",
      actualPrice: 2800,
      category: "top-wear",
      color: "Black",
      desc: "Black Hoodie Sweatshirt For Men",
      image: img7,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [36, 38, 40, 42],
      material: "Cotton",
      occasion: "Winter/Casual",
      price: 1800,
      rating: 3.8,
      type: "Sweatshirt",
      sleeve: 'Full Sleeve',
      pattern: 'Plain',
      neck: 'Hood'
    },
    {
      id: 8,
      title: "Leather Jacket",
      actualPrice: 5000,
      category: "top-wear",
      color: "Black",
      desc: "Leather Black Biker Jacket For Men",
      image: img8,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [36, 38, 40, 42],
      material: "Leather",
      occasion: "Riding/Casual",
      price: 4000,
      rating: 4.8,
      type: "Jacket",
      sleeve: 'Full Sleeve',
      pattern: 'Solid',
      neck: 'Spread Collar'
    },
    {
      id: 9,
      title: "Puffer Jacket",
      actualPrice: 4500,
      category: "top-wear",
      color: "White",
      desc: "White Puffer Jacket For Men",
      image: img9,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [36, 38, 40, 42],
      material: "Cotton",
      occasion: "Winter/Casual",
      price: 3500,
      rating: 2.8,
      type: "Jacket",
      sleeve: 'Full Sleeve',
      pattern: 'Plain',
      neck: 'Hood'
    },
    {
      id: 10,
      title: "Casual Jacket",
      actualPrice: 4000,
      category: "top-wear",
      color: "Beige",
      desc: "Casual Beige Jacket For Men",
      image: img10,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [36, 38, 40, 42],
      material: "Fabric",
      occasion: "Casual",
      price: 3000,
      rating: 2.7,
      type: "Jacket",
      sleeve: 'Full Sleeve',
      pattern: 'Solid',
      neck: 'Mock Collar'
    },
    {
      id: 11,
      title: "Dark Shirt",
      actualPrice: 2000,
      category: "top-wear",
      color: "Dark Green",
      desc: "Dark Green Shirt With Checks For Men",
      image: img11,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [36, 38, 40, 42],
      material: "Cotton",
      occasion: "Formal/Casual",
      price: 1000,
      rating: 3.9,
      type: "Shirt",
      sleeve: 'Full Sleeve',
      pattern: 'Checks',
      neck: 'Collar'
    },
    {
      id: 12,
      title: "T-shirt Men",
      actualPrice: 1000,
      category: "top-wear",
      color: "Black",
      desc: "Casual Black T-shirt For Men",
      image: img12,
      listed: { wishlisted: false, cartlisted: false, cart: { quantity: 0, selectedSize: '' } },
      sizeAvailable: [36, 38, 40, 42],
      material: "Cotton",
      occasion: "Casual",
      price: 750,
      rating: 4.6,
      type: "T-shirt",
      sleeve: 'Half Sleeve',
      pattern: 'Plain',
      neck: 'Round'
    }
  ]

  let localItems = JSON.parse(localStorage.getItem('miuItems'))

  if (localItems === null) {
    localStorage.setItem('miuItems', JSON.stringify(items))
  }

  let [products, setProducts] = useState(localItems);

  const [alert, setAlert] = useState(null);
  
  const [whiteScreen, setWhiteScreen] = useState(false)

  const showAlert = (msg, sym, type) => {
    setAlert({ msg: msg, sym: sym, type: type })

    setTimeout(()=>{
      setAlert(null)
    }, 1000)
  }

  const showFinalAlert = (msg, sym, type) => {
    setAlert({ msg: msg, sym: sym, type: type })

    setTimeout(()=>{
      setAlert(null)
    }, 3000)
  }

  const handleWishlist = (e, product) => {

    let target = e.target;

    if(target.classList.contains('fa')||target.classList.contains('fa-regular')){
      if(target.classList.contains('fa-regular')){
        target.classList.remove('fa-regular')
        target.classList.add('fa')
      }
      else{
        target.classList.remove('fa')
        target.classList.add('fa-regular')
      }
    }

    for (let i = 0; i < products.length; i++) {
      if (product.id === products[i].id) {
        if (target.dataset.id === 'add') {
          products[i].listed.wishlisted = true;
          products[i].listed.cartlisted = false;
          showAlert('Removed From Cart',<i className="ms-2 fa fa-times"></i>, 'danger')
        }
        else {
          if (products[i].listed.wishlisted === true) {
            products[i].listed.wishlisted = false;
            showAlert('Remove From Wishlist', <i className="ms-2 fa-regular fa-heart"></i>, 'danger')
          }
          else {
            products[i].listed.wishlisted = true
            showAlert('Added To Wishlist',<i className="ms-2 fa fa-heart"></i>, 'primary')
          }
        }
        localStorage.setItem('miuItems', JSON.stringify(products))
        let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
        setProducts(updatedLocalItems)
      }
    }
  }

  const handleCart = (e, product) => {
    let target = e.target;

    for (let i = 0; i < products.length; i++) {
      if (product.id === products[i].id) {
        if (target.dataset.id === 'add') {
          products[i].listed.cartlisted = true;
          products[i].listed.cart.quantity = parseFloat(products[i].listed.cart.quantity) + 1;
          showAlert('Added To Cart',<i className="ms-2 fa fa-check"></i>, 'primary')
        }
        else if (target.dataset.id === 'removeWish') {
          products[i].listed.cartlisted = true;
          products[i].listed.wishlisted = false;
          products[i].listed.cart.quantity = products[i].listed.cart.quantity !==0 ? products[i].listed.cart.quantity : parseFloat(products[i].listed.cart.quantity)+1;
          showAlert('Added To Cart',<i className="ms-2 fa fa-check"></i>, 'primary')
        }
        else {
          products[i].listed.cartlisted = false;
          products[i].listed.cart.quantity = 0;
          products[i].listed.cart.selectedSize = '';
          showAlert('Removed From Cart',<i className="ms-2 fa fa-times"></i>, 'danger')
        }
      }
    }
    localStorage.setItem('miuItems', JSON.stringify(products))
    let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
    setProducts(updatedLocalItems)
  }
  return (
    <Router>
      <Navbar products={products} />
      <Alert alert={alert} />
      <WhiteScreen whiteScreen={whiteScreen}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<Collections products={products} handleWishlist={handleWishlist} handleCart={handleCart} />} />
        <Route path='/wishlist' element={<WishlistItems products={products} handleWishlist={handleWishlist} handleCart={handleCart} />} />
        <Route path='/product/:id' element={<Product products={products} setProducts={setProducts} handleWishlist={handleWishlist} handleCart={handleCart} />} />
        <Route path='/cart' element={<Cart alert={alert} showAlert={showAlert} showFinalAlert={showFinalAlert} setWhiteScreen={setWhiteScreen} products={products} setProducts={setProducts} handleWishlist={handleWishlist} handleCart={handleCart} />} />
      </Routes>
    </Router>
  );

}

export default App;
