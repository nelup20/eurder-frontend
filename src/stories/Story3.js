
import React from "react";
import {Hero, Section, Heading} from "react-bulma-components";
import SectionResult from "../common/SectionResult";

class Story3 extends React.Component{

    state = {
        story3: this.props.story3
    };


    constructor(props){
        super(props);
        this.setState(props.story3);
    }

    highlightInputIfEmpty = (story, inputName, itemIndex) => {
        return this.props.highlightInputIfEmpty(story, inputName, itemIndex);
    };

    displayHelperMessageIfInputEmpty = (story, inputName, itemIndex) => {
        return this.props.displayHelperMessageIfInputEmpty(story, inputName, itemIndex);
    }

    highlightNumericInputIfNegative = (story, inputName, itemIndex) => {
        return this.props.highlightNumericInputIfNegative(story, inputName, itemIndex);
    }

    displayHelperMessageIfNumericInputIsNegative = (story, inputName, itemIndex) => {
        return this.props.displayHelperMessageIfNumericInputIsNegative(story, inputName, itemIndex);
    }

    handleInputChange = (event) => {
        this.props.handleInputChange(event);
    }

    handleStory3Inputs = (event) => {
        this.props.handleStory3Inputs(event);
    }
    
    addItemToOrder = () => {
        this.props.addItemToOrder();
    }

    removeItemToOrder = () => {
        this.props.removeItemToOrder();
    }

    OrderItems = () => {
        this.props.OrderItems();
    }

    render(){
        return (
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
                                <input type="text" className={ "input" + this.highlightInputIfEmpty("story3", "itemId", {index})} value={value.itemId} onChange={this.handleStory3Inputs} data-story="story3" data-item-index={index} name="itemId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story3", "itemId", {index})}>Item ID can't be empty</p>
                              </div>
                            </div>

                            <div className="field">
                              <label className="label">Amount of item #{index+1} to order</label>
                              <div className="control">
                                <input type="number" min={0} className={"input " + this.highlightNumericInputIfNegative("story3", "itemQuantityToOrder", index)} value={value.itemQuantityToOrder} onChange={this.handleStory3Inputs} data-item-index={index} data-story="story3" name="itemQuantityToOrder" placeholder="5"/>
                                <p className={"help " + this.displayHelperMessageIfNumericInputIsNegative("story3", "itemQuantityToOrder", index)}>Quantity to order can't be negative!</p>
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

        <SectionResult returnedResult = {this.state.story3.returnedResult} requestWasSuccessful = {this.state.story3.requestWasSuccessful} />
        </Section>
        )
    }
}

export default Story3;