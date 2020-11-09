import React from "react";
import Story1 from "./stories/Story1";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Hero, Section, Heading} from "react-bulma-components";
import './App.css';


class App extends React.Component{
  EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  BASE_URL = "http://localhost:8080";
  
  state = {
    story1: {
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

    story2: {
      inputs: {
        userId: "de6def71-53ca-4e5e-85ef-9ed3ab598391",
        name: "Bread",
        description: "The best bread in the world.",
        priceInEuros: 6.75,
        amountInStock: 10
      },
      returnedResult: "",
      requestWasSuccessful: true
    },

    story3: {
      inputs: {
        numberOfItems: 1,
        customerId: "c6093628-b11a-4ece-b2f0-509fc0f3c132",
        items: [
          {
            itemId: "44492ce0-dfca-49f5-b519-0bf2839f2d64",
            itemQuantityToOrder: 5
        },
        {
          itemId: "bc23cbd0-fc7a-404d-a473-39711a0f7c7c",
          itemQuantityToOrder: 22
        }
      ]
      },
      returnedResult: "",
      requestWasSuccessful: true
    },
  }

  highlightInputIfEmpty = (story, inputName) => {
    return this.state[story].inputs[inputName].length !== 0 ? " is-success" : " is-danger";
  }

  displayHelperMessageIfInputEmpty = (story, inputName) => {
    return this.state[story].inputs[inputName].length !== 0 ? " is-hidden" : " is-danger";
  }

  highlightNumericInputIfNegative = (story, inputName) => {
    return this.state[story].inputs[inputName] >= 0 ? " is-success" : " is-danger";
  }

  displayHelperMessageIfNumericInputIsNegative = (story, inputName) => {
    return this.state[story].inputs[inputName] >= 0 ? " is-hidden" : " is-danger";
  }

  areAllInputsInStoryNotEmpty(story){

    for(let input of Object.values(this.state[story].inputs)){
        if(input.length === 0) return false;
    }

    return true;
  }

  createCustomer = () => {
    let headers = {
      "Content-Type": "application/json"
    };

    let body = JSON.stringify({
      firstName: this.state.story1.inputs.firstName,
      lastName: this.state.story1.inputs.lastName,
      emailAddress: this.state.story1.inputs.emailAddress,
      address: this.state.story1.inputs.address,
      phoneNumber: this.state.story1.inputs.phoneNumber
    });

    this.makePostRequestAndDisplayResult("/customers", body, headers, "story1");
  }

  addItem = () => {
    let headers = {
      "Content-Type": "application/json",
      "userId": this.state.story2.inputs.userId
    };

    let body = JSON.stringify({
      name: this.state.story2.inputs.name,
      description: this.state.story2.inputs.description,
      priceInEuros: this.state.story2.inputs.priceInEuros,
      amountInStock: Math.floor(this.state.story2.inputs.amountInStock)
    });

    this.makePostRequestAndDisplayResult("/items", body, headers, "story2");
  }

  OrderItems = () => {
    let headers = {
      "Content-Type": "application/json",
      "customerId": this.state.story3.inputs.customerId
    };

    let body = JSON.stringify(this.state.story3.inputs.items);

    this.makePostRequestAndDisplayResult("/orders", body, headers, "story3");
  }

  makePostRequestAndDisplayResult = (endpoint, body, headers, story) => {
    if(this.areAllInputsInStoryNotEmpty(story)){

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
          oldState[story].returnedResult = stringResult;
          oldState[story].requestWasSuccessful = result.status && (result.status === 400 || result.status === 401 || result.status === 403 || result.status === 404) ? false : true;

          this.setState(oldState)
        })
        .catch(err => console.log(err));
    };
  }

  handleInputChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let inputStory = event.target.getAttribute("data-story");

    let oldState = this.state;

    if(inputName === "emailAddress"){
      oldState[inputStory].isEmailValid = this.EMAIL_REGEX.test(inputValue);
    }

    oldState[inputStory].inputs[inputName] = inputValue;

    this.setState(oldState);
  }

  handleStory3Inputs = (event) => {
    let itemIndex = event.target.getAttribute("data-item-index");
    let inputName = event.target.name; 
    let inputValue = event.target.value;

    let oldState = this.state;

    oldState.story3.inputs.items[itemIndex][inputName] = inputValue;

    this.setState(oldState);
  }

  addItemToOrder = () => {
    let oldState = this.state;
    oldState.story3.inputs.items.push({
      itemId: "",
      itemQuantityToOrder: 0
    });

    this.setState(oldState);
  }

  removeItemToOrder = () => {
    let oldState = this.state;
    oldState.story3.inputs.items.pop();

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

       <Story1 story1 = {this.state.story1} highlightInputIfEmpty = {this.highlightInputIfEmpty} displayHelperMessageIfInputEmpty = {this.displayHelperMessageIfInputEmpty} handleInputChange = {this.handleInputChange} createCustomer = {this.createCustomer} />

        <Section>
        <Heading>Story #2 - Add an item: POST request to /items</Heading>
        <div className="endpointSectionBody">
          <div className="endpointSectionBody-inputSide">
            
            <div className="field">
              <label className="label">User ID</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("story2", "userId") } value={this.state.story2.inputs.userId} onChange={this.handleInputChange} data-story="story2" name="userId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story2", "userId")}>User ID can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's name</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("story2", "name") } value={this.state.story2.inputs.name} onChange={this.handleInputChange} data-story="story2" name="name" placeholder="Coca-Cola"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story2", "name")}>Item name can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's description</label>
              <div className="control">
                <input type="text" className={"input " + this.highlightInputIfEmpty("story2", "description") } value={this.state.story2.inputs.description} onChange={this.handleInputChange} data-story="story2" name="description" placeholder="A very refreshing carbonated drink"/>
                <p className={"help " + this.displayHelperMessageIfInputEmpty("story2", "description")}>Item's description can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's price in euros</label>
              <div className="control">
                <input type="number" min={0} className={ "input" + this.highlightNumericInputIfNegative("story2", "priceInEuros") } value={this.state.story2.inputs.priceInEuros} data-story="story2" onChange={this.handleInputChange} name="priceInEuros" placeholder="2.45"/>
                <p className={"help "  + this.displayHelperMessageIfNumericInputIsNegative("story2", "priceInEuros")}>Price can't be negative</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Amount of item in stock</label>
              <div className="control">
                <input type="number" min={0} className={ "input" + this.highlightNumericInputIfNegative("story2", "amountInStock") } value={this.state.story2.inputs.amountInStock} data-story="story2" onChange={this.handleInputChange} name="amountInStock" placeholder="5"/>
                <p className={"help "  + this.displayHelperMessageIfNumericInputIsNegative("story2", "amountInStock")}>Amount in stock can't be negative</p>
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
        <div className={"endpointSectionResult" + (this.state.story2.returnedResult.length === 0 ? " is-hidden" : "")}>
          <Heading size={4} >Results:</Heading>
          <textarea className={"textarea " + (this.state.story2.requestWasSuccessful ? " is-success" : " is-danger")} rows={7} value={this.state.story2.returnedResult} readOnly></textarea>
        </div>
        </Section>


        <Section>
        <Heading>Story #3 - Order items: POST request to /orders</Heading>
        <div className="endpointSectionBody">
          <div className="endpointSectionBody-inputSide">
            
            <div className="field">
              <label className="label">Customer ID</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("story3", "customerId") } value={this.state.story3.inputs.customerId} onChange={this.handleInputChange} data-story="story3" name="customerId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story3", "customerId")}>Customer ID can't be empty</p>
              </div>
            </div>

            <Heading size={5} id="itemsToOrderHeading">Items to order:</Heading>
            <div className="itemsToOrder">
              {this.state.story3.inputs.items.map((value, index) => {
                return (
                  <div key={index}>
                          <div className="field">
                            <label className="label">Item #{index+1}'s ID</label>
                              <div className="control">
                                <input type="text" className={ "input"} value={value.itemId} onChange={this.handleStory3Inputs} data-story="story3" data-item-index={index} name="itemId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                                {/* <p className={"help "  + this.displayHelperMessageIfInputEmpty("story3", "name")}>Item name can't be empty</p> */}
                              </div>
                            </div>

                            <div className="field">
                              <label className="label">Amount of item #{index+1} to order</label>
                              <div className="control">
                                <input type="number" min={0} className={"input " } value={value.itemQuantityToOrder} onChange={this.handleStory3Inputs} data-item-index={index} data-story="story3" name="itemQuantityToOrder" placeholder="5"/>
                                {/* <p className={"help " + this.displayHelperMessageIfInputEmpty("story2", "description")}>Item's description can't be empty</p> */}
                              </div>
                            </div>
                            <br></br>
                    </div>
                )
              })}
            </div>

          
            <div className="field is-grouped">
            <div className="control">
                <button className="button is-link" onClick={this.addItemToOrder}>Add Items to order</button>
              </div>
              <div className="control">
                <button className="button is-danger" onClick={this.removeItemToOrder}>Remove Items to order</button>
              </div>
              <div className="control">
                <button className="button is-primary" onClick={this.OrderItems}>Order Items</button>
              </div>
            </div>

          </div>
          <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
            <Hero.Body className="is-size-5">
              <div><span className="has-text-weight-bold">Requirements:</span> A Customer ID in the Header for the customerId key. Also a JSON payload in the body which contains an Array of objects with the following fields:
              <ul>
                <li>itemId: String</li>
                <li>itemQuantityToOrder: Integer</li>
              </ul>
              </div>
              <br/>
              <div><span className="has-text-weight-bold">Expected Response:</span> JSON object of the newly created order</div>
            </Hero.Body>
          </Hero>
          
        </div>
        <div className={"endpointSectionResult" + (this.state.story3.returnedResult.length === 0 ? " is-hidden" : "")}>
          <Heading size={4} >Results:</Heading>
          <textarea className={"textarea " + (this.state.story3.requestWasSuccessful ? " is-success" : " is-danger")} rows={7} value={this.state.story3.returnedResult} readOnly></textarea>
        </div>
        </Section>
      </div>
    )
  }
}

export default App;
