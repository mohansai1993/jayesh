import React, { useEffect, useRef } from 'react';

const ProductSection = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carouselEl = carouselRef.current;
    const videos = carouselEl.querySelectorAll("video");

    videos.forEach(video => {
      video.addEventListener("ended", handleVideoEnd);
    });

    return () => {
      videos.forEach(video => {
        video.removeEventListener("ended", handleVideoEnd);
      });
    };
  }, []);

  const handleVideoEnd = () => {
    const carousel = new bootstrap.Carousel(carouselRef.current);
    carousel.next();
  };

  return (
    <div id="product" className="tutorial">
      <div className="">
        <div className="row m-0">
          <div className="col-lg-6 col-md-6 col-12 order-lg-1 order-lg-1 order-5 my-auto px-100 py-lg-0 py-5">
            <h2 className="f-40">How is Adzviser different and better?</h2>
            <p className="f-16 py-4 ligth-gray f-16">Our proprietary natural language understanding technology will get your result fast.</p>
            <div className="tipBox d-flex bg-white p-3 border-r-10 mb-4">
              <div>
                <span className="num-icon all-center text-main fw-bold">1</span>
              </div>
              <div className=" ms-4">
                <p className="f-16">Type your mind to fetch data with minimum scrolling, mousing and clicking.</p>
              </div>
            </div>
            <div className="tipBox d-flex bg-white p-3 border-r-10 mb-4">
              <div>
                <span className="num-icon all-center text-main fw-bold">2</span>
              </div>
              <div className=" ms-4">
                <p className="f-16">Reach a good understanding of your performance without engineering.</p>
              </div>
            </div>
            <div className="tipBox d-flex bg-white p-3 border-r-10">
              <div>
                <span className="num-icon all-center text-main fw-bold">3</span>
              </div>
              <div className=" ms-4">
                <p className="f-16">Abridge the knowledge gap with generative AI, narrowing the divide between experts and novices in media planning, data analytics, and reporting, etc.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 order-lg-2 order-lg-2 order-1 py-110 tutorial-img">
            <div id="carouselExampleIndicators" ref={carouselRef} className="carousel slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <video className="w-100" autoPlay={true} muted>
                    <source src="/assets/images/googleAdsIsDemo_acc.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="carousel-item">
                  <video className="w-100" autoPlay={true} muted>
                    <source src="/assets/images/bingAdsKeywordsDemo_acc.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="carousel-item">
                  <video className="w-100" autoPlay={true} muted>
                    <source src="/assets/images/fbPagePostDemo_acc.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="carousel-item">
                  <video className="w-100" autoPlay={true} muted>
                    <source src="/assets/images/ga4TrafficSourceDemo_acc.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
