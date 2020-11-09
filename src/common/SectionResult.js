import React from "react";
import {Heading} from "react-bulma-components";

class SectionResult extends React.Component{
  
    render(){
        return (
            <div>
                <div className={"endpointSectionResult" + (this.props.returnedResult.length === 0 ? " is-hidden" : "")}>
                    <Heading size={4} >Results:</Heading>
                    <textarea className={"textarea " + (this.props.requestWasSuccessful ? " is-success" : " is-danger")} rows={7} value={this.props.returnedResult} readOnly></textarea>
                </div>
            </div>
        )
    }
} 

export default SectionResult;