import React from 'react';
import Navbar from '../components/Navbar';
import ProductDetails from '../components/ProductDetails';
import ImageModal from '../components/ImageModal';

import './details.css';

//shows product details, stateful container components (CMIIW)
class Details extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      productKey: '',
      product: [],
      loaded: false,
      showModal: false
    }

    this.fetchAPI = this.fetchAPI.bind(this);
    this.showModalHandler = this.showModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);

  }

  fetchAPI(url){
    fetch(url)
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.setState({
          product : jsonResponse,
          loaded: true
        });
        console.log(jsonResponse);
      }).catch(err => {
        console.log('error sob', err);
      });
  }

  showModalHandler(){
    this.setState({
      showModal : true
    })
  }

  closeModalHandler(){
    this.setState({
      showModal : false
    })
  }

  componentWillMount(){
    let updatedKey = this.props.match.params.id;
    this.setState({
      productKey: updatedKey
    });
  }

  componentDidMount(){
    this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products/product_detail/' + this.state.productKey + '.json');
  }

  render(){
    return(
      <React.Fragment>
        <Navbar page={'list'} />
        <ProductDetails selectedProduct={this.state.product} loadedProduct={this.state.loaded} onClickHandler={this.showModalHandler} />
        {this.state.showModal ? <ImageModal image={this.state.product} onClickHandler={this.closeModalHandler} /> : null}
      </React.Fragment>
    )
  }
}

export default Details;
