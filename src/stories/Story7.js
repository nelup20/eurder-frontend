
import React from "react";
import {Hero, Section, Heading} from "react-bulma-components";
import SectionResult from "../common/SectionResult";

class Story7 extends React.Component{

    state = {
        story7: this.props.story7
    };


    constructor(props){
        super(props);
        this.setState(props.story7);
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

    getAllCustomers = () => {
        this.props.getAllCustomers();
    }

    render(){
        return (
            <Section>
            <Heading>Story #7 - View all customers: GET request to /customers</Heading>
            <div className="endpointSectionBody">
              <div className="endpointSectionBody-inputSide">
                
                <div className="field">
                  <label className="label">User ID</label>
                  <div className="control">
                    <input type="text" className={ "input" + this.highlightInputIfEmpty("story7", "userId") } value={this.state.story7.inputs.userId} onChange={this.handleInputChange} data-story="story7" name="userId" placeholder="John"/>
                    <p className={"help "  + this.displayHelperMessageIfInputEmpty("story7", "userId")}>User ID can't be empty</p>
                  </div>
                </div>
    
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" onClick={this.getAllCustomers}>Get All Customers</button>
                  </div>
                </div>
    
              </div>
              <Hero className="has-background-grey-lighter endpointSectionBody-descriptionSide" id="initialDataHero">
                <Hero.Body className="is-size-5">
                  <div><span className="has-text-weight-bold">Requirements:</span> An Admin ID in the Header for the userId key.
                  </div>
                  <br/>
                  <div><span className="has-text-weight-bold">Expected Response:</span> JSON array of all Eurder customers.</div>
                </Hero.Body>
              </Hero>
              
            </div>
            
            <SectionResult returnedResult = {this.state.story7.returnedResult} requestWasSuccessful = {this.state.story7.requestWasSuccessful} />
            </Section>
        )
    }
}

export default Story7;