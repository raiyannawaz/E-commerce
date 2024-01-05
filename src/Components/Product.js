import { useParams } from 'react-router-dom'

export default function Product({ products, setProducts, handleWishlist, handleCart }) {

  let param = useParams();

  let filteredProduct = products.filter((product) => {
    return product.id === parseInt(param.id)
  })[0]

  let { title, price, desc, image: img, listed, rating, color, actualPrice } = filteredProduct;

  const ratingColor = () => {
    if (rating >= 4) {
      return `rgb(0, 112, 0)`
    }
    else if (rating < 4 && rating >= 3) {
      return `rgb(0, 206, 0)`
    }
    else if (rating < 3 && rating >= 2) {
      return `rgb(209, 224, 0)`
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const itemVal = document.getElementById('itemVal')
    const itemMsg = document.getElementById('itemMsg')

    if (itemVal.value !== '') {
      itemVal.value = '';
      itemMsg.innerHTML = `Available <i className="text-success fa fa-check"></i>`
    }
    else {
      itemMsg.innerText = 'Please Write Something'
    }
  }

  const handleSizeSelect = (e) => {
    let target = e.target;

    target.classList.add('active')

    let sizes = document.querySelectorAll('.size')

    sizes.forEach((size) => {
      if (size !== target) {
        size.classList.remove('active')
      }
    })

    for (let i = 0; i < products.length; i++) {
      if (filteredProduct.id === products[i].id) {
        products[i].listed.cart.selectedSize = parseInt(e.target.textContent)
        localStorage.setItem('miuItems', JSON.stringify(products))
        let updatedLocalItems = JSON.parse(localStorage.getItem('miuItems'))
        setProducts(updatedLocalItems)
      }
    }
  }


  return (
    <div className="item-div">
      <div className='container-fluid'>
        <div className="row">
          <div className="col-lg-11 col-12 mx-auto">
            <div className="row gy-lg-0 gx-5">
              {/* Left */}
              <div className="col-lg-4 col-12">
                <div className="item-img" style={{ height: '350px' }}>
                  <img src={img} className='img-fluid h-100 p-3' alt="" />
                </div>
                <div className="item-content-div-1">
                  <h2>{title}</h2>
                  <h6 className='text-muted'>{desc}</h6>
                  <hr className='mb-2 mt-0' />
                  <div className="d-flex justify-content-between align-items-center pe-5 mb-1">
                    <h4 className='fw-bold m-0'>₹{price}</h4>
                    <p className='fs-5 m-0 fw-light'>MRP</p>
                    <p className='fs-5 m-0 text-decoration-line-through text-muted'> ₹{actualPrice}</p>
                    <p className='fs-5 m-0 text-danger fw-lighter'>{`Rs.(${actualPrice - price}) Off`}</p>
                  </div>
                </div>
                <p className='text-success mb-2'>Including all the taxes</p>
                <div className="item-content-div-2 d-flex">
                  <button className='px-3 cart me-3' onClick={(e) => { handleCart(e, filteredProduct) }} data-id='add'>Add To Cart <i className="fa-solid fa-bag-shopping"></i></button>
                  <button className='wishlist px-3' onClick={((e) => { handleWishlist(e, filteredProduct) })}>{listed.wishlisted ? 'Added' : 'Wishlist'} {listed.wishlisted ? <i className='fa fa-heart'></i> : <i className='fa-regular fa-heart'></i>}</button>
                </div>
              </div>
              {/* Left */}
              {/* Right */}
              <div className="col-lg-8 col-12">
                <div className="item-info-div-1">
                  <hr />
                  <h3>Product Specification</h3>
                  <div className="row gx-0">
                    <div className="col-lg-4 col-6">
                      <p className='mb-1'><span className='fw-bold'>Color:</span> {color}</p>
                      <p className='mb-1'><span className='fw-bold'>{filteredProduct.material ? 'Material:' : filteredProduct.dialType ? 'Dial-Type:' : ''}</span> {filteredProduct.material ? filteredProduct.material : filteredProduct.dialType ? filteredProduct.dialType : ''}</p>
                      <p className='mb-0'><span className='fw-bold'>{filteredProduct.material ? 'Occasion:' : filteredProduct.strapType ? 'Strap-Type:' : ''}</span> {filteredProduct.material ? filteredProduct.occasion : filteredProduct.strapType ? filteredProduct.strapType : ''}</p>
                    </div>
                    <div className="col-lg-4 col-6">
                      <p className='mb-1'><span className='fw-bold'>{filteredProduct.length ? 'Length:' : filteredProduct.ankleHeight ? 'Ankle Height:' : filteredProduct.sleeve ? 'Sleeve:' : ''}</span> {filteredProduct.length ? filteredProduct.length : filteredProduct.ankleHeight ? filteredProduct.ankleHeight : filteredProduct.sleeve ? filteredProduct.sleeve : ''}</p>
                      <p className='mb-1'><span className='fw-bold'>{filteredProduct.shade ? 'Shade:' : filteredProduct.pattern ? 'Pattern:' : filteredProduct.fastening ? 'Fastening:' : ''}</span> {filteredProduct.shade ? filteredProduct.shade : filteredProduct.pattern ? filteredProduct.pattern : filteredProduct.fastening ? filteredProduct.fastening : ''}</p>
                      <p className='mb-0'><span className='fw-bold'>{filteredProduct.soleMaterial ? 'Sole Material:' : filteredProduct.waistRise ? 'Waist Raise:' : filteredProduct.neck ? 'Neck:' : ''}</span> {filteredProduct.soleMaterial ? filteredProduct.soleMaterial : filteredProduct.waistRise ? filteredProduct.waistRise : filteredProduct.neck ? filteredProduct.neck : ''}</p>
                    </div>
                  </div>
                </div>
                {filteredProduct.sizeAvailable ? <div className="item-info-div-2">
                  <hr />
                  <h3>Size Available</h3>
                  <div className="d-flex">
                    {filteredProduct.sizeAvailable.map((size) => {
                      return <div className='size me-2' onClick={handleSizeSelect} key={size}>{size}</div>
                    })}
                  </div>
                </div> : ''}
                <div className="item-info-div-3">
                  <hr />
                  <div className="d-flex align-items-center">
                    <h3 className='mb-0'>Ratings</h3>
                    <h3 className='mx-2 mb-0'>{rating} <i className='fa fa-star' style={{ color: ratingColor() }}></i></h3>
                  </div>
                </div>
                <div className="item-info-div-4 pb-lg-0 pb-3">
                  <hr />
                  <h3>Delivery Options</h3>
                  <form action="" onSubmit={handleOnSubmit}>
                    <p className='mb-2' id='itemMsg'>Check Your Cities</p>
                    <div className="form-group  w-lg-25 w-50">
                      <input type="text" id='itemVal' className='form-control' />
                    </div>
                    <button className='mt-3 px-3'>Check</button>
                  </form>
                </div>
              </div>
              {/* Right */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
