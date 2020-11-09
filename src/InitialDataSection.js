import React from "react";
import {Heading, Hero, Section} from "react-bulma-components";

class InitialDataSection extends React.Component{

    render(){
        return(
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
        )
    }
}

export default InitialDataSection;