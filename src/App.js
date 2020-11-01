import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Hero, Section, Heading, Input, Control, Field, Label} from "react-bulma-components";
import './App.css';

class App extends React.Component{
  EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  BASE_URL = "http://localhost:8080";
  
  state = {
    section1: {
        inputs: {
          firstName: "Tom",
          lastName: "Doe",
          emailAddress: "tom@tom.com",
          address: "Tom doe street 22",
          phoneNumber: "012345678"
        },
        isEmailValid: true,
        returnedResult: "",
        requestWasSuccessful: true
    },

    section2: {
      inputs: {
        userId: "de6def71-53ca-4e5e-85ef-9ed3ab598391",
        name: "Bread",
        description: "The best bread in the world.",
        priceInEuros: 6.75,
        amountInStock: 10
      },
      returnedResult: "",
      requestWasSuccessful: true
    }
  }

  highlightInputIfEmpty = (section, inputName) => {
    return this.state[section].inputs[inputName].length !== 0 ? " is-success" : " is-danger";
  }

  displayHelperMessageIfInputEmpty = (section, inputName) => {
    return this.state[section].inputs[inputName].length !== 0 ? " is-hidden" : " is-danger";
  }

  highlightNumericInputIfNegative = (section, inputName) => {
    return this.state[section].inputs[inputName] >= 0 ? " is-success" : " is-danger";
  }

  displayHelperMessageIfNumericInputIsNegative = (section, inputName) => {
    return this.state[section].inputs[inputName] >= 0 ? " is-hidden" : " is-danger";
  }

  areAllInputsInSectionNotEmpty(section){

    for(let input of Object.values(this.state[section].inputs)){
        if(input.length === 0) return false;
    }

    return true;
  }

  createCustomer = () => {
    let headers = {
      "Content-Type": "application/json"
    };

    let body = JSON.stringify({
      firstName: this.state.section1.inputs.firstName,
      lastName: this.state.section1.inputs.lastName,
      emailAddress: this.state.section1.inputs.emailAddress,
      address: this.state.section1.inputs.address,
      phoneNumber: this.state.section1.inputs.phoneNumber
    });

    this.makePostRequestAndDisplayResult("/customers", body, headers, "section1");
  }

  addItem = () => {
    let headers = {
      "Content-Type": "application/json",
      "userId": this.state.section2.inputs.userId
    };

    let body = JSON.stringify({
      name: this.state.section2.inputs.name,
      description: this.state.section2.inputs.description,
      priceInEuros: this.state.section2.inputs.priceInEuros,
      amountInStock: Math.floor(this.state.section2.inputs.amountInStock)
    });

    this.makePostRequestAndDisplayResult("/items", body, headers, "section2");
  }

  makePostRequestAndDisplayResult = (endpoint, body, headers, section) => {
    if(this.areAllInputsInSectionNotEmpty(section)){

      fetch( this.BASE_URL + endpoint, {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: body
      }).then(res => res.json())
        .then(result => {
          let stringResult = JSON.stringify(result);
          stringResult = stringResult.replaceAll(",\"", ",\n\"");

          let oldState = this.state;
          oldState[section].returnedResult = stringResult;
          oldState[section].requestWasSuccessful = result.status && (result.status === 400 || result.status === 401 || result.status === 403 || result.status === 404) ? false : true;

          this.setState(oldState)
        })
        .catch(err => console.log(err));
    };
  }

  handleInputChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let inputSection = event.target.getAttribute("data-section");

    let oldState = this.state;

    if(inputName === "emailAddress"){
      oldState[inputSection].isEmailValid = this.EMAIL_REGEX.test(inputValue);
    }

    oldState[inputSection].inputs[inputName] = inputValue;

    this.setState(oldState);
  }

  render(){
    return(
      <div className="container">
        <img src="order-logo.png" id="order-logo"/>
        <Section>
        <Hero color="primary" id="aboutHero">
            <Heading className="heroHeading">What is this web app for?</Heading>
            <Heading className="heroHeading" subtitle size={4}>This web app was made as a small project in order to practice creating backends with Spring Boot. The purpose of this extremely-minimal frontend made in React (w/ Bulma) is to allow others to easily test the API/endpoints without having to create requests using various tools such as Postman. Below you'll see sections divided by the specific endpoint, with a small description of what the requirements are to create a successful request, as well as what will be expected as a result. <br/><br/> Most inputs will be pre-filled with the correct data necessary to make a successful request. You can of course modify the input to see what the result will be. If you're not sure what data to use, you can always go and copy-paste the data from the block below which contains the initial data that is loaded when the app starts and will therefore always result in a successful request.</Heading>
        </Hero>
        </Section>

        <Section>
        <Heading>Initial data</Heading>
        <Hero className="has-background-grey-lighter" id="initialDataHero">
          <Hero.Body className="is-size-5">
            <div><span className="has-text-weight-bold">Admin ID:</span> de6def71-53ca-4e5e-85ef-9ed3ab598391</div>
            <div><span className="has-text-weight-bold">Customer ID:</span> c6093628-b11a-4ece-b2f0-509fc0f3c132</div>
            <div><span className="has-text-weight-bold">Item #1 ID:</span> 44492ce0-dfca-49f5-b519-0bf2839f2d64</div>
            <div><span className="has-text-weight-bold">Item #2 ID:</span> bc23cbd0-fc7a-404d-a473-39711a0f7c7c</div>
            <div><span className="has-text-weight-bold">Item #3 ID:</span> b79533d1-3b13-47e8-9efb-7c96bb9245c4</div>
            <div><span className="has-text-weight-bold">Item #4 ID:</span> c0b6efc9-ed65-448d-a06e-21a1ed4b48c8</div>
          </Hero.Body>
        </Hero>
        </Section>

        <Section>
        <Heading>#1 - Create a customer account: POST request to /customers</Heading>
        <div className="endpointSectionBody">
          <div className="endpointSectionBody-inputSide">
            
            <div className="field">
              <label className="label">Customer's first name</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("section1", "firstName") } value={this.state.section1.inputs.firstName} onChange={this.handleInputChange} data-section="section1" name="firstName" placeholder="John"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("section1", "firstName")}>First name can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's last name</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("section1", "lastName") } value={this.state.section1.inputs.lastName} onChange={this.handleInputChange} data-section="section1" name="lastName" placeholder="Doe"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("section1", "lastName")}>Last name can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's email</label>
              <div className="control">
                <input type="email" className={"input " + (this.state.section1.isEmailValid ? " is-success" : " is-danger") } value={this.state.section1.inputs.emailAddress} onChange={this.handleInputChange} data-section="section1" name="emailAddress" placeholder="john@doe.com"/>
                <p className={"help " + (this.state.section1.isEmailValid ? " is-hidden" : " is-danger")}>This email is invalid</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's address</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("section1", "address") } value={this.state.section1.inputs.address} onChange={this.handleInputChange} data-section="section1" name="address" placeholder="John doe street 23"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("section1", "address")}>Address can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's phone number</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("section1", "phoneNumber") } value={this.state.section1.inputs.phoneNumber} onChange={this.handleInputChange} data-section="section1" name="phoneNumber" placeholder="012345678"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("section1", "phoneNumber")}>Phone number can't be empty</p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.createCustomer}>Create</button>
              </div>
            </div>

          </div>
          <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
            <Hero.Body className="is-size-5">
              <div><span className="has-text-weight-bold">Requirements:</span> JSON payload in the body with the following fields and their required types:
              <ul>
                <li>firstName: String</li>
                <li>lastName: String</li>
                <li>emailAddress: String</li>
                <li>address: String</li>
                <li>phoneNumber: String</li>
              </ul>
              </div>
              <br/>
              <div><span className="has-text-weight-bold">Expected Response:</span> JSON object of the newly created customer</div>
            </Hero.Body>
          </Hero>
          
        </div>
        <div className={"endpointSectionResult" + (this.state.section1.returnedResult.length === 0 ? " is-hidden" : "")}>
          <Heading size={4} >Results:</Heading>
          <textarea className={"textarea " + (this.state.section1.requestWasSuccessful ? " is-success" : " is-danger")} rows={7} value={this.state.section1.returnedResult} readOnly></textarea>
        </div>
        </Section>

        <Section>
        <Heading>#2 - Add an item: POST request to /items</Heading>
        <div className="endpointSectionBody">
          <div className="endpointSectionBody-inputSide">
            
            <div className="field">
              <label className="label">User ID</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("section2", "userId") } value={this.state.section2.inputs.userId} onChange={this.handleInputChange} data-section="section2" name="userId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("section2", "userId")}>User ID can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's name</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("section2", "name") } value={this.state.section2.inputs.name} onChange={this.handleInputChange} data-section="section2" name="name" placeholder="Coca-Cola"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("section2", "name")}>Item name can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's description</label>
              <div className="control">
                <input type="text" className={"input " + this.highlightInputIfEmpty("section2", "description") } value={this.state.section2.inputs.description} onChange={this.handleInputChange} data-section="section2" name="description" placeholder="A very refreshing carbonated drink"/>
                <p className={"help " + this.displayHelperMessageIfInputEmpty("section2", "description")}>Item's description can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's price in euros</label>
              <div className="control">
                <input type="number" min={0} className={ "input" + this.highlightNumericInputIfNegative("section2", "priceInEuros") } value={this.state.section2.inputs.priceInEuros} data-section="section2" onChange={this.handleInputChange} name="priceInEuros" placeholder="2.45"/>
                <p className={"help "  + this.displayHelperMessageIfNumericInputIsNegative("section2", "priceInEuros")}>Price can't be negative</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Amount of item in stock</label>
              <div className="control">
                <input type="number" min={0} className={ "input" + this.highlightNumericInputIfNegative("section2", "amountInStock") } value={this.state.section2.inputs.amountInStock} data-section="section2" onChange={this.handleInputChange} name="amountInStock" placeholder="5"/>
                <p className={"help "  + this.displayHelperMessageIfNumericInputIsNegative("section2", "amountInStock")}>Amount in stock can't be negative</p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.addItem}>Add Item</button>
              </div>
            </div>

          </div>
          <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
            <Hero.Body className="is-size-5">
              <div><span className="has-text-weight-bold">Requirements:</span> An Admin ID in the Header for the userId key. Also a JSON payload in the body with the following fields and their required types:
              <ul>
                <li>name: String</li>
                <li>description: String</li>
                <li>priceInEuros: Double</li>
                <li>amountInStock: Integer</li>
              </ul>
              </div>
              <br/>
              <div><span className="has-text-weight-bold">Expected Response:</span> JSON object of the newly added item</div>
            </Hero.Body>
          </Hero>
          
        </div>
        <div className={"endpointSectionResult" + (this.state.section2.returnedResult.length === 0 ? " is-hidden" : "")}>
          <Heading size={4} >Results:</Heading>
          <textarea className={"textarea " + (this.state.section2.requestWasSuccessful ? " is-success" : " is-danger")} rows={7} value={this.state.section2.returnedResult} readOnly></textarea>
        </div>
        </Section>
      </div>
    )
  }
}

export default App;
