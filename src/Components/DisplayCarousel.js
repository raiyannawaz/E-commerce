import React from 'react'

export default function DisplayCarousel() {
    return (
        <div className="container-fluid mt-2 pt-1">
            <div className="row gx-2 gy-lg-0 gy-2">
                <div className="col-lg-8">
                    <div id="display" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                            </div>
                            <div className="carousel-item">
                            </div>
                            <div className="carousel-item">
                            </div>
                            <div className="carousel-item">
                            </div>
                            <div className="carousel-item">
                            </div>
                        </div>
                        <ul className="carousel-indicators">
                            <li data-bs-target="#display" data-bs-slide-to="0" aria-label="Slide 1" className='active'></li>
                            <li data-bs-target="#display" data-bs-slide-to="1" aria-label="Slide 2"></li>
                            <li data-bs-target="#display" data-bs-slide-to="2" aria-label="Slide 3"></li>
                            <li data-bs-target="#display" data-bs-slide-to="3" aria-label="Slide 4"></li>
                            <li data-bs-target="#display" data-bs-slide-to="4" aria-label="Slide 5"></li>
                        </ul>
                        <button className="carousel-control-prev" type="button" data-bs-target="#display" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#display" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div id="sideDisplay" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="carousel-caption">
                                    <h2>Formal Outfit</h2>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-caption">
                                    <h2>Casual Outfit</h2>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="carousel-caption">
                                    <h2>Sport Outfit</h2>
                                </div>
                            </div>
                        </div>
                        <ul className="carousel-indicators">
                            <li data-bs-target="#sideDisplay" data-bs-slide-to="0" aria-label="Slide 1" className='active'></li>
                            <li data-bs-target="#sideDisplay" data-bs-slide-to="1" aria-label="Slide 2"></li>
                            <li data-bs-target="#sideDisplay" data-bs-slide-to="2" aria-label="Slide 3"></li>
                        </ul>
                        <button className="carousel-control-prev" type="button" data-bs-target="#sideDisplay" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#sideDisplay" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
