import { useState } from 'react';
import Collection from './Collection'

export default function Collections({ products, handleWishlist, handleCart }) {

  const [category, setCategory] = useState(products)

  const handleCategory = (e) =>{
    let target = e.target;
    target.classList.add('active')

    let filterProducts = products.filter((product)=>{
      return target.dataset.id === product.category
    })

    if(target.dataset.id === 'all'){
      setCategory(products)
    }
    else{
      setCategory(filterProducts)
    }

    const btns = document.querySelectorAll('button')
    btns.forEach((btn)=>{
      if(btn!==target){
        btn.classList.remove('active')
      }
    })
  }

  return (
    <div className="container py-lg-4 py-3 collections">

      <div className="pb-lg-4 pb-3 row gy-lg-0 gy-2 justify-content-center align-items-center">
        <button data-id='all' className='col-auto mx-2 px-lg-3 active' onClick={handleCategory}>All</button>
        <button data-id='top-wear' className='col-auto mx-2 px-lg-3' onClick={handleCategory}>Top-Wear</button>
        <button data-id='bottom-wear' className='col-auto mx-2 px-lg-3' onClick={handleCategory}>Bottom-Wear</button>
        <button data-id='foot-wear' className='col-auto mx-2 px-lg-3' onClick={handleCategory}>Foot-Wear</button>
        <button data-id='accessories' className='col-auto mx-2 px-lg-3' onClick={handleCategory}>Accessories</button>
      </div>
      
      <div className="row g-lg-4 g-2 px-lg-5">
        {category.map((product)=>{
          return <div className="col-lg-3 col-md-4 col-6" key={product.id}>
            <Collection product={product} handleWishlist={handleWishlist} handleCart={handleCart}/>
          </div>
        })}
      </div>
    </div>
  )
}
