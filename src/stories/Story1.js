
import React from "react";
import {Hero, Section, Heading} from "react-bulma-components";
import SectionResult from "../common/SectionResult";

class Story1 extends React.Component{

    state = {
        story1: this.props.story1
    };


    constructor(props){
        super(props);
        this.setState(props.story1);
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

    createCustomer = () => {
        this.props.createCustomer();
    }

    render(){
        return (
            <Section>
            <Heading>Story #1 - Create a customer account: POST request to /customers</Heading>
            <div className="endpointSectionBody">
              <div className="endpointSectionBody-inputSide">
                
                <div className="field">
                  <label className="label">Customer's first name</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story1", "firstName") } value={this.state.story1.inputs.firstName} onChange={this.handleInputChange} data-story="story1" name="firstName" placeholder="John"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story1", "firstName")}>First name can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <label className="label">Customer's last name</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story1", "lastName") } value={this.state.story1.inputs.lastName} onChange={this.handleInputChange} data-story="story1" name="lastName" placeholder="Doe"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story1", "lastName")}>Last name can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <label className="label">Customer's email</label>
                  <div className="control">
                    <input type="email" className={"input " + (this.state.story1.isEmailValid ? " is-success" : " is-danger") } value={this.state.story1.inputs.emailAddress} onChange={this.handleInputChange} data-story="story1" name="emailAddress" placeholder="john@doe.com"/>
                    <p className={"help " + (this.state.story1.isEmailValid ? " is-hidden" : " is-danger")}>This email is invalid</p>
                  </div>
                </div>
    
                <div className="field">
                  <label className="label">Customer's address</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story1", "address") } value={this.state.story1.inputs.address} onChange={this.handleInputChange} data-story="story1" name="address" placeholder="John doe street 23"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story1", "address")}>Address can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <label className="label">Customer's phone number</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story1", "phoneNumber") } value={this.state.story1.inputs.phoneNumber} onChange={this.handleInputChange} data-story="story1" name="phoneNumber" placeholder="012345678"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story1", "phoneNumber")}>Phone number can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" onClick={this.createCustomer}>Create Customer</button>
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
            
            <SectionResult returnedResult = {this.state.story1.returnedResult} requestWasSuccessful = {this.state.story1.requestWasSuccessful} />
            </Section>
        )
    }
}

export default Story1;