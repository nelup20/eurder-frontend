import React from "react";
import WebAppInformationSection from "./WebAppInformationSection";
import InitialDataSection from "./InitialDataSection";
import Story1 from "./stories/Story1";
import Story2 from "./stories/Story2";
import Story3 from "./stories/Story3";
import Story7 from "./stories/Story7";
import Story8 from "./stories/Story8";
import "react-bulma-components/dist/react-bulma-components.min.css";
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

    story7: {
      inputs: {
        userId: "de6def71-53ca-4e5e-85ef-9ed3ab598391"
      },
      returnedResult: "",
      requestWasSuccessful: true
    },

    story8: {
      inputs: {
        userId: "de6def71-53ca-4e5e-85ef-9ed3ab598391",
        customerId: "c6093628-b11a-4ece-b2f0-509fc0f3c132"
      },
      returnedResult: "",
      requestWasSuccessful: true
    }
  }

  highlightInputIfEmpty = (story, inputName, itemIndex = 0) => {
    if(story === "story3" && inputName === "itemId" && itemIndex){
      return this.state[story].inputs.items[itemIndex.index][inputName].length !== 0 ? " is-success" : " is-danger";
    }

    return this.state[story].inputs[inputName].length !== 0 ? " is-success" : " is-danger";
  }

  displayHelperMessageIfInputEmpty = (story, inputName, itemIndex = 0) => {
    if(story === "story3" && inputName === "itemId"){
      return this.state[story].inputs.items[itemIndex.index][inputName].length !== 0 ? " is-hidden" : " is-danger";
    }

    return this.state[story].inputs[inputName].length !== 0 ? " is-hidden" : " is-danger";
  }

  highlightNumericInputIfNegative = (story, inputName, itemIndex = 0) => {
    if(story === "story3" && inputName === "itemQuantityToOrder"){
      // WHY WHY WHY. Why was itemIndex an object in the regular highlightInputIfEmpty but here it's just the int directly? Spent ~15 mins figuring out why the above didn't work & just had to console.log to see itemIndex in the above function was an object.
      return this.state[story].inputs.items[itemIndex][inputName] >= 0 ? " is-success" : " is-danger";
    }

    return this.state[story].inputs[inputName] >= 0 ? " is-success" : " is-danger";
  }

  displayHelperMessageIfNumericInputIsNegative = (story, inputName, itemIndex = 0) => {
    if(story === "story3" && inputName === "itemQuantityToOrder"){
      return this.state[story].inputs.items[itemIndex][inputName] >= 0 ? " is-hidden" : " is-danger";
    }

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

  getAllCustomers = () => {
    let headers = {
      "userId": this.state.story7.inputs.userId
    };

    this.makeGetRequestAndDisplayResult("/customers", headers, "story7");
  }
  
  getCustomerById = () => {
    let headers = {
      "userId": this.state.story8.inputs.userId
    };

    this.makeGetRequestAndDisplayResult("/customers/" + this.state.story8.inputs.customerId, headers, "story8");
  }

  makeGetRequestAndDisplayResult = (endpoint, headers, story) => {
    if(this.areAllInputsInStoryNotEmpty(story)){

      fetch( this.BASE_URL + endpoint, {
        method: "GET",
        mode: "cors",
        headers: headers
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
        
        <WebAppInformationSection />
        <InitialDataSection />

       <Story1 story1 = {this.state.story1} highlightInputIfEmpty = {this.highlightInputIfEmpty} displayHelperMessageIfInputEmpty = {this.displayHelperMessageIfInputEmpty} handleInputChange = {this.handleInputChange} createCustomer = {this.createCustomer} />
       <Story2 story2 = {this.state.story2} highlightInputIfEmpty = {this.highlightInputIfEmpty} displayHelperMessageIfInputEmpty = {this.displayHelperMessageIfInputEmpty} handleInputChange = {this.handleInputChange} highlightNumericInputIfNegative = {this.highlightNumericInputIfNegative} displayHelperMessageIfNumericInputIsNegative = {this.displayHelperMessageIfNumericInputIsNegative} addItem = {this.addItem} />
       <Story3 story3 = {this.state.story3} highlightInputIfEmpty = {this.highlightInputIfEmpty} displayHelperMessageIfInputEmpty = {this.displayHelperMessageIfInputEmpty} handleInputChange = {this.handleInputChange} highlightNumericInputIfNegative = {this.highlightNumericInputIfNegative} displayHelperMessageIfNumericInputIsNegative = {this.displayHelperMessageIfNumericInputIsNegative} addItemToOrder = {this.addItemToOrder} removeItemToOrder = {this.removeItemToOrder} OrderItems = {this.OrderItems} handleStory3Inputs = {this.handleStory3Inputs}  addItem = {this.addItem} />
       <Story7 story7 = {this.state.story7} highlightInputIfEmpty = {this.highlightInputIfEmpty} displayHelperMessageIfInputEmpty = {this.displayHelperMessageIfInputEmpty} handleInputChange = {this.handleInputChange} getAllCustomers = {this.getAllCustomers} />
       <Story8 story8 = {this.state.story8} highlightInputIfEmpty = {this.highlightInputIfEmpty} displayHelperMessageIfInputEmpty = {this.displayHelperMessageIfInputEmpty} handleInputChange = {this.handleInputChange} getCustomerById = {this.getCustomerById} />
        
      </div>
    )
  }
}

export default App;
