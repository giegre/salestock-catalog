import React from 'react';
import { Col } from 'react-bootstrap/lib/';
import { Link } from 'react-router-dom';

import './ProductList.css';

//shows all products in the Home page, stateless presentation components (CMIIW)
const ProductList = ({ListOfProduct, onClickHandler}) => {

  return(
    <div className="container list-box">
      <div className="row">
        {
          ListOfProduct.map((product) => {
            return(
              <Col md={4} sm={6} key={product.Key}>
                <div className="product-box">
                  <Link to={"/Details/" + product.Name}>
                    <img src={product.Image} alt={product.Name} />
                  </Link>
                  <div className="product-data">
                    <h5 className="product-name">{product.Name}</h5>
                    <h5 className="product-price">{product.Price}</h5>
                    <span className="product-size">{product.Size}</span>
                    <hr />
                  </div>
                  <div className="product-likes">
                    <span>{product.Naksir} sista naksir ini</span>
                  </div>
                </div>
              </Col>
            )
          })
        }
      </div>
      <div className="row">
        <button type="button" onClick={onClickHandler} className="btn btn-primary">Load More</button>
      </div>
    </div>
  )

}

export default ProductList;
