
import React from "react";
import {Hero, Section, Heading} from "react-bulma-components";
import SectionResult from "../common/SectionResult";

class Story8 extends React.Component{

    state = {
        story8: this.props.story8
    };


    constructor(props){
        super(props);
        this.setState(props.story8);
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

    getCustomerById = () => {
        this.props.getCustomerById();
    }

    render(){
        return (
            <Section>
            <Heading>Story #8 - View a single customer: GET request to /customers/{'{customerId}'}</Heading>
            <div className="endpointSectionBody">
              <div className="endpointSectionBody-inputSide">
                
                <div className="field">
                  <label className="label">User ID</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story8", "userId") } value={this.state.story8.inputs.userId} onChange={this.handleInputChange} data-story="story8" name="userId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story8", "userId")}>User ID can't be empty</p>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Customer ID</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story8", "customerId") } value={this.state.story8.inputs.customerId} onChange={this.handleInputChange} data-story="story8" name="customerId" placeholder="ab9s3i16-53ca-4e5e-85ef-4ed3dc59f356"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story8", "customerId")}>Customer ID can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" onClick={this.getCustomerById}>Get Customer</button>
                  </div>
                </div>
    
              </div>
              <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
                <Hero.Body className="is-size-5">
                  <div><span className="has-text-weight-bold">Requirements:</span> An Admin ID in the Header for the userId key and a customer ID in the path /customers/{'{customerId}'}.
                  </div>
                  <br/>
                  <div><span className="has-text-weight-bold">Expected Response:</span> JSON object of the requested customer.</div>
                </Hero.Body>
              </Hero>
              
            </div>
            
            <SectionResult returnedResult = {this.state.story8.returnedResult} requestWasSuccessful = {this.state.story8.requestWasSuccessful} />
            </Section>
        )
    }
}

export default Story8;