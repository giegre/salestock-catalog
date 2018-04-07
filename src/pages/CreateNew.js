import React from 'react';
import Navbar from '../components/Navbar';
import firebase from '../components/firebase.js';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap/lib/';

import './UpdateDetail.css';

class CreateNew extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      databaseLength: 0,
      product: [],
      productName: '',
      productPrice: '',
      productImage: '',
      productImageBig: '',
      productDescription: '',
      productSize: ''
    }

    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageBigChange = this.handleImageBigChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
  }

  handleNameChange(e){
    this.setState({
      productName: e.target.value
    });
  }

  handlePriceChange(e){
    this.setState({
      productPrice: e.target.value
    });
  }

  handleImageChange(e){
    this.setState({
      productImage: e.target.value
    });
  }

  handleImageBigChange(e){
    this.setState({
      productImageBig: e.target.value
    });
  }

  handleDescriptionChange(e){
    this.setState({
      productDescription: e.target.value
    });
  }

  handleSizeChange(e){
    this.setState({
      productSize: e.target.value
    });
  }

  handleUpdateChange(){
    let databaseDetail = firebase.database().ref().child("Products").child("product_detail");
    let child = databaseDetail.child(this.state.productName);

    child.child("Price").set(this.state.productPrice);
    child.child("Image").set(this.state.productImage);
    child.child("Image_Big").set(this.state.productImageBig);
    child.child("Description").set(this.state.productDescription);
    child.child("Size").set(this.state.productSize);

    let databaseList = firebase.database().ref().child("Products").child("product_list");
    let childList = databaseList.child(this.state.databaseLength);

    childList.child("Name").set(this.state.productName);
    childList.child("Price").set(this.state.productPrice);
    childList.child("Image").set(this.state.productImage);
    childList.child("Size").set(this.state.productSize);
    childList.child("Key").set(this.state.databaseLength + 1);
    childList.child("Naksir").set(Math.floor(Math.random() * Math.floor(10000)));

    alert("Produk baru telah terpasang");
  }

  fetchAPI(url){
    fetch(url)
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        let jsonLength = jsonResponse.length;
        this.setState({
          databaseLength: jsonLength
        });
      }).catch(err => {
        console.log('error sob', err);
      });
  }


  componentWillMount(){
    this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products/product_list.json');
  }


  render(){
    return(
      <React.Fragment>
        <Navbar page={'update'} />
        <div className='container'>
          <div className="row justify-content-center">
            <Col md={6} sm={8}>
              <div className='update-form-wrapper'>
                <h4>Input New Product</h4>
                <Form>
                  <FormGroup>
                    <ControlLabel className="label">Product Name</ControlLabel>
                    <FormControl type="text" value={this.state.productName} placeholder="Enter Product Name" onChange={this.handleNameChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Product Price</ControlLabel>
                    <FormControl type="text" value={this.state.productPrice} placeholder="Enter Product Price" onChange={this.handlePriceChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Thumb Image URL</ControlLabel>
                    <FormControl type="text" value={this.state.productImage} placeholder="Enter Thumb Image URL" onChange={this.handleImageChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Large Image URL</ControlLabel>
                    <FormControl type="text" value={this.state.productImageBig} placeholder="Enter Large Image URL" onChange={this.handleImageBigChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Product Description</ControlLabel>
                    <FormControl componentClass="textarea" value={this.state.productDescription} placeholder="Enter Product Size" onChange={this.handleDescriptionChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Product Size</ControlLabel>
                    <FormControl type="text" value={this.state.productSize} placeholder="Enter Product Available Sizes" onChange={this.handleSizeChange} />
                  </FormGroup>
                  <Button type="button" className="btn btn-primary" onClick={this.handleUpdateChange}>Update</Button>
                </Form>
              </div>
            </Col>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default CreateNew;
