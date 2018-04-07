import React from 'react';
import Navbar from '../components/Navbar';
import firebase from '../components/firebase.js';
import { Link } from 'react-router-dom';

import UpdateCatalogList from '../components/UpdateCatalogList';

import './UpdateCatalog.css';

class UpdateCatalog extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      logged: '',
      Products: [],
      limit: 8
    }

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
      limit: this.state.limit + 8
    })
    this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products.json');
  }

  componentWillMount(){
    var user = firebase.auth().currentUser;

    if (user) {
      this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products.json');
      this.setState({
        logged: true
      });
    } else {
      this.setState({
        logged: false
      });
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <React.Fragment>
        <Navbar page={'update'} />
        { this.state.logged === false ?
          <Link to="/Login"><h5 className="error-text">You must login first! click here to login</h5></Link>
          : <UpdateCatalogList ListOfProduct={this.state.Products} onClickLoadHandler={this.onLoadMoreHandle} />
        }

      </React.Fragment>
    )
  }
}

export default UpdateCatalog;
