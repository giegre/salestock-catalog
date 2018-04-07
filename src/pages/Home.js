import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';

import './home.css';

//shows all products, stateful container components (CMIIW)
class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      Products: [],
      limit: 6
    };

    this.fetchAPI = this.fetchAPI.bind(this);
    this.onLoadMoreHandle = this.onLoadMoreHandle.bind(this);
  }

  fetchAPI(url){
    fetch(url)
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        let jsonProduct = jsonResponse.product_list.slice(0, this.state.limit)
        this.setState({
          Products: jsonProduct
        });
      }).catch(err => {
        console.log('error sob', err);
      });
  }

  onLoadMoreHandle(){
    this.setState({
      limit: this.state.limit + 6
    })
    this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products.json');
  }

  componentWillMount(){
    this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products.json');
  }

  componentDidMount(){

  }

  render(){
    return(
      <React.Fragment>
        <Navbar page={'list'} />
        <ProductList ListOfProduct={this.state.Products} onClickHandler={this.onLoadMoreHandle}/>
      </React.Fragment>
    )
  }
}

export default Home;
