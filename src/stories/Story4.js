import React from "react";
import {Heading, Hero, Section} from "react-bulma-components";
import SectionResult from "../common/SectionResult";

class Story4 extends React.Component{

    state = {
        story4: this.props.story4
    };


    constructor(props){
        super(props);
        this.setState(props.story4);
    }

    highlightInputIfEmpty = (story, inputName) => {
        return this.props.highlightInputIfEmpty(story, inputName);
    };

    displayHelperMessageIfInputEmpty = (story, inputName) => {
        return this.props.displayHelperMessageIfInputEmpty(story, inputName);
    }

    highlightNumericInputIfNegative = (story, inputName) => {
        return this.props.highlightNumericInputIfNegative(story, inputName);
    }

    displayHelperMessageIfNumericInputIsNegative = (story, inputName) => {
        return this.props.displayHelperMessageIfNumericInputIsNegative(story, inputName);
    }

    handleInputChange = (event) => {
        this.props.handleInputChange(event);
    }

    updateItem = () => {
        this.props.updateItem();
    }

    render(){
        return(
            <Section>
        <Heading>Story #4 - Update an item: PUT request to /items/{"{itemId}"}</Heading>
        <div className="endpointSectionBody">
          <div className="endpointSectionBody-inputSide">
            
            <div className="field">
              <label className="label">User ID</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("story4", "userId") } value={this.state.story4.inputs.userId} onChange={this.handleInputChange} data-story="story4" name="userId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story4", "userId")}>User ID can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item ID</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("story4", "itemId") } value={this.state.story4.inputs.itemId} onChange={this.handleInputChange} data-story="story4" name="itemId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story4", "itemId")}>Item ID can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's name</label>
              <div className="control">
                <input type="text" className={ "input" + this.highlightInputIfEmpty("story4", "name") } value={this.state.story4.inputs.name} onChange={this.handleInputChange} data-story="story4" name="name" placeholder="Coca-Cola"/>
                <p className={"help "  + this.displayHelperMessageIfInputEmpty("story4", "name")}>Item name can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's description</label>
              <div className="control">
                <input type="text" className={"input " + this.highlightInputIfEmpty("story4", "description") } value={this.state.story4.inputs.description} onChange={this.handleInputChange} data-story="story4" name="description" placeholder="A very refreshing carbonated drink"/>
                <p className={"help " + this.displayHelperMessageIfInputEmpty("story4", "description")}>Item's description can't be empty</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Item's price in euros</label>
              <div className="control">
                <input type="number" min={0} className={ "input" + this.highlightNumericInputIfNegative("story4", "priceInEuros") } value={this.state.story4.inputs.priceInEuros} data-story="story4" onChange={this.handleInputChange} name="priceInEuros" placeholder="4.45"/>
                <p className={"help "  + this.displayHelperMessageIfNumericInputIsNegative("story4", "priceInEuros")}>Price can't be negative</p>
              </div>
            </div>

            <div className="field">
              <label className="label">Amount of item in stock</label>
              <div className="control">
                <input type="number" min={0} className={ "input" + this.highlightNumericInputIfNegative("story4", "amountInStock") } value={this.state.story4.inputs.amountInStock} data-story="story4" onChange={this.handleInputChange} name="amountInStock" placeholder="5"/>
                <p className={"help "  + this.displayHelperMessageIfNumericInputIsNegative("story4", "amountInStock")}>Amount in stock can't be negative</p>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.updateItem}>Update Item</button>
              </div>
            </div>

          </div>
          <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
            <Hero.Body className="is-size-5">
              <div><span className="has-text-weight-bold">Requirements:</span> An Admin ID in the Header for the userId key, and an Item ID in the path /items/{"{itemId}"}. Also a JSON payload in the body with the following fields and their required types:
              <ul>
                <li>name: String</li>
                <li>description: String</li>
                <li>priceInEuros: Double</li>
                <li>amountInStock: Integer</li>
              </ul>
              </div>
              <br/>
              <div><span className="has-text-weight-bold">Expected Response:</span> JSON object of the updated item</div>
            </Hero.Body>
          </Hero>
          
        </div>
        
        <SectionResult returnedResult = {this.state.story4.returnedResult} requestWasSuccessful = {this.state.story4.requestWasSuccessful} />
        </Section>
        )
    }
}

export default Story4;