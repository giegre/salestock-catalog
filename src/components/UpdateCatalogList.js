import React from 'react';
import { Col } from 'react-bootstrap/lib/';
import { Link } from 'react-router-dom';

import './UpdateCatalogList.css';

//shows all product in the CMS, stateless presentation components (CMIIW)
const UpdateCatalogList = ({ListOfProduct, onClickLoadHandler}) => {

  return(
    <div className="container update-detail-container">
      <div className="row justify-content-center">
        <Link to="/Create-New">
          <button type="button" className="btn btn-success">Input New Product</button>
        </Link>
      </div>
      <div className="row">
        {
          ListOfProduct.map((product) => {
            return (
              <Col md={6} sm={6} key={product.Key}>
                <div className="product-detail-box">
                  <Col sm={3}>
                    <img src={product.Image} alt={product.Name} />
                  </Col>
                  <Col sm={9}>
                    <h5 className="product-detail-name">{product.Name}</h5>
                    <h5 className="product-detail-price">{product.Price}</h5>
                    <Link to={"/Update-Catalog/" + product.Name} >
                      <span className="edit-btn">Edit Product</span>
                    </Link>
                  </Col>
                </div>
              </Col>
            )
          })
        }
      </div>
      <div className="row">
        <button type="button" onClick={onClickLoadHandler} className="btn btn-primary">Load More</button>
      </div>
    </div>
  )

}

export default UpdateCatalogList;
