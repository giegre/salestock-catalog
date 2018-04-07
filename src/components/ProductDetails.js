import React from 'react';
import { Col } from 'react-bootstrap/lib/';

//shows selected product details, stateless presentation components (CMIIW)
const ProductDetails = ({selectedProduct, loadedProduct, onClickHandler}) => {

  let product = selectedProduct;
  let loaded = loadedProduct;

  return(
    <div className="container">
      <div className="row justify-content-center">
        <Col md={6} sm={8} >
          <div className="product-detail-box">
            {loaded ? null : <h5 className="loading">Loading...</h5>}
            <img src={product.Image} alt={product.Name} onClick={onClickHandler}/>
            <div className="product-detail-data">
              <h4 className="product-detail-name">{product.Name}</h4>
              <h4 className="product-detail-price">{product.Price}</h4>
              <span className="product-detail-size">{product.Size}</span>
              <hr />
            </div>
            <div className="product-detail-description">
              { product.Description ?
                <p>{product.Description}</p>
                : null
              }
            </div>
            <div className="product-detail-likes">
              <span>{product.Naksir} sista naksir ini</span>
            </div>
          </div>
        </Col>
      </div>
    </div>
  )

}

export default ProductDetails;
