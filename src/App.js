import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Hero, Section, Heading, Input, Control, Field, Label} from "react-bulma-components";
import './App.css';

class App extends React.Component{
  EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  state = {
    section1: {
        inputs: {
          firstName: "Tom",
          lastName: "Doe",
          emailAddress: "tom@tom.com",
          address: "Tom doe street 22",
          phoneNumber: "012345678"
        },
        isEmailValid: true
    }
  }

  createCustomer = () => {
    console.log("I got clicked!");
  }

  handleInputChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let oldState = this.state;

    if(inputName === "emailAddress"){
      oldState.section1.isEmailValid = this.EMAIL_REGEX.test(inputValue);
    }

    oldState.section1.inputs[inputName] = inputValue;

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
                <input type="text" className="input" value={this.state.section1.inputs.firstName} onChange={this.handleInputChange} name="firstName" placeholder="John"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's last name</label>
              <div className="control">
                <input type="text" className="input" value={this.state.section1.inputs.lastName} onChange={this.handleInputChange} name="lastName" placeholder="Doe"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's email</label>
              <div className="control">
                <input type="email" className={"input " + (this.state.section1.isEmailValid ? " is-success" : " is-danger") } value={this.state.section1.inputs.emailAddress} onChange={this.handleInputChange} name="emailAddress" placeholder="john@doe.com"/>
                <p className={"help " + (this.state.section1.isEmailValid ? " is-hidden" : " is-danger")}>This email is invalid</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's address</label>
              <div className="control">
                <input type="text" className="input" value={this.state.section1.inputs.address} onChange={this.handleInputChange} name="address" placeholder="John doe street 23"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Customer's phone number</label>
              <div className="control">
                <input type="text" className="input" value={this.state.section1.inputs.phoneNumber} onChange={this.handleInputChange} name="phoneNumber" placeholder="012345678"/>
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
        </Section>
      </div>
    )
  }
}

export default App;
