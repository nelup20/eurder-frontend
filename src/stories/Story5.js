
import React from "react";
import {Hero, Section, Heading} from "react-bulma-components";
import SectionResult from "../common/SectionResult";

class Story5 extends React.Component{

    state = {
        story5: this.props.story5
    };


    constructor(props){
        super(props);
        this.setState(props.story5);
    }

    highlightInputIfEmpty = (story, inputName) => {
        return this.props.highlightInputIfEmpty(story, inputName);
    };

    displayHelperMessageIfInputEmpty = (story, inputName) => {
        return this.props.displayHelperMessageIfInputEmpty(story, inputName);
    }

    handleInputChange = (event) => {
        this.props.handleInputChange(event);
    }

    getReportOfOrders = () => {
        this.props.getReportOfOrders();
    }

    render(){
        return (
            <Section>
            <Heading>Story #5 - View report of orders: GET request to /orders/my-orders</Heading>
            <div className="endpointSectionBody">
              <div className="endpointSectionBody-inputSide">
                
                <div className="field">
                  <label className="label">Customer ID</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story5", "customerId") } value={this.state.story5.inputs.customerId} onChange={this.handleInputChange} data-story="story5" name="customerId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story5", "customerId")}>Customer ID can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" onClick={this.getReportOfOrders}>Get Orders Report</button>
                  </div>
                </div>
    
              </div>
              <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
                <Hero.Body className="is-size-5">
                  <div><span className="has-text-weight-bold">Requirements:</span> A Customer ID in the Header for the customerId key.
                  </div>
                  <br/>
                  <div><span className="has-text-weight-bold">Expected Response:</span> JSON object with the report of all orders.</div>
                </Hero.Body>
              </Hero>
              
            </div>
            
            <SectionResult returnedResult = {this.state.story5.returnedResult} requestWasSuccessful = {this.state.story5.requestWasSuccessful} />
            </Section>
        )
    }
}

export default Story5;