import React from 'react';
import Navbar from '../components/Navbar';
import firebase from '../components/firebase.js';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap/lib/';

import './UpdateDetail.css';

//handles updating selected product details
class Details extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      productKey: '',
      product: [],
      productName: '',
      productPrice: '',
      productImage: '',
      productImageBig: '',
      productDescription: '',
      productSize: '',
      tempKey: 0
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

  fetchAPI(url){
    fetch(url)
      .then(response => {
        return response.json();
      }).then(jsonResponse => {
        this.setState({
          product : jsonResponse,
          productName: jsonResponse.Name,
          productPrice: jsonResponse.Price,
          productImage: jsonResponse.Image,
          productImageBig: jsonResponse.Image_Big,
          productDescription: jsonResponse.Description,
          productSize: jsonResponse.Size
        });
      }).catch(err => {
        console.log('error sob', err);
      });
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
    let child = databaseDetail.child(this.state.productKey);

    child.child("Name").set(this.state.productName);
    child.child("Price").set(this.state.productPrice);
    child.child("Image").set(this.state.productImage);
    this.state.productImageBig ? child.child("Image_Big").set(this.state.productImageBig) : child.child("Image_Big").set(this.state.productImage);
    this.state.productDescription ? child.child("Description").set(this.state.productDescription) : child.child("Description").set(" ");
    child.child("Size").set(this.state.productSize);

    let nameToChange = this.state.productName;
    child.once('value', function(snapshot) {
      databaseDetail.child(nameToChange).set(snapshot.val());
      child.remove();
    });

    let databaseList = firebase.database().ref().child("Products").child("product_list");
    let childList = databaseList.child(this.state.tempKey);

    childList.child("Name").set(this.state.productName);
    childList.child("Price").set(this.state.productPrice);
    childList.child("Image").set(this.state.productImage);
    childList.child("Size").set(this.state.productSize);

    alert("Product berhasil di update!");

  }

  componentWillMount(){
    let updatedKey = this.props.match.params.id;
    this.setState({
      productKey: updatedKey
    });
  }

  componentDidMount(){
    this.fetchAPI('https://salestock-e55ad.firebaseio.com/Products/product_detail/' + this.state.productKey + '.json');

    let databaseList = firebase.database().ref().child("Products").child("product_list");
    databaseList.orderByChild("Name").equalTo(this.state.productKey).on("child_added", (snapshot) => {
      this.setState({
        tempKey : snapshot.val().Key - 1
      })
    });

  }

  //Products can only be updated, cannot be deleted
  //After Updating the details, the apps didn't redirects you to anywhere, allowing you to updates another updates

  render(){
    return(
      <React.Fragment>
        <Navbar page={'update'} />
        <div className='container'>
          <div className="row justify-content-center">
            <Col md={6} sm={8}>
              <div className='update-form-wrapper'>
                <h4>Update Product Data</h4>
                <Form>
                  <FormGroup>
                    <ControlLabel className="label">Product Name</ControlLabel>
                    <FormControl type="text" value={this.state.productName} placeholder="Enter text" onChange={this.handleNameChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Product Price</ControlLabel>
                    <FormControl type="text" value={this.state.productPrice} placeholder="Enter text" onChange={this.handlePriceChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Thumb Image URL</ControlLabel>
                    <img className="img-exp" src={this.state.productImage} alt="regular thumbs" />
                    <FormControl type="text" value={this.state.productImage} placeholder="Enter text" onChange={this.handleImageChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Large Image URL</ControlLabel>
                    <img className="img-exp" src={this.state.productImageBig} alt="large thumbs" />
                    <FormControl type="text" value={this.state.productImageBig} placeholder="Enter text" onChange={this.handleImageBigChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Product Description</ControlLabel>
                    <FormControl componentClass="textarea" value={this.state.productDescription} placeholder="Enter text" onChange={this.handleDescriptionChange} />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel className="label">Product Size</ControlLabel>
                    <FormControl type="text" value={this.state.productSize} placeholder="Enter text" onChange={this.handleSizeChange} />
                  </FormGroup>
                  <div className="update-form-buttons">
                    <Button type="button" className="btn btn-success" onClick={this.handleUpdateChange}>Update Product</Button>
                  </div>
                </Form>
              </div>
            </Col>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Details;
