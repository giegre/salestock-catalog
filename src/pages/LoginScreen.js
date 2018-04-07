import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap/lib/';
import firebase from '../components/firebase.js';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LoginScreen.css';

//handles login page before accessing the CMS
class LoginScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      logged : false
    };

    this.onLoginHandler = this.onLoginHandler.bind(this);
  }

  onLoginHandler(){

    let email = document.getElementById("emailText").value;
    let password = document.getElementById("passText").value;
    let errorText = document.getElementById("errorText");

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          logged: true
        })
      })
      .catch(function(error){
        errorText.innerHTML = error.message;
      });
  }

  componentWillMount(){
    //always logout when re render page
    this.setState({
      logged: false
    })
    firebase.auth().signOut().catch(function(error) {
      console.log('error sob', error)
    });
  }

  render(){
    return(
      <React.Fragment>
        <Navbar page={'update'} />
        <div className="login-wrapper">
          <div className="form-wrapper">
            <Form inline>
              <FormGroup className="form-inline">
                <FormControl type="input" placeholder="Your Email" id="emailText" />
              </FormGroup>
              <FormGroup className="form-inline">
                <FormControl type="password" placeholder="Your password" id="passText" />
              </FormGroup>
              <Button className="btn btn-primary" onClick={this.onLoginHandler} >Login</Button>
            </Form>
            { this.state.logged === false ?
              <p id="errorText">You must login first</p>
            :
              <Link to="/Update-Catalog" ><p id="successText">Login success! click here to continue</p></Link>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginScreen;
