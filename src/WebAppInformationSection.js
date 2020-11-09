import React from "react";
import {Heading, Hero, Section} from "react-bulma-components";

class WebAppInformationSection extends React.Component{
    render(){
        return(
            <Section>
                <Hero color="primary" id="aboutHero">
                    <Heading className="heroHeading">What is this web app for?</Heading>
                    <Heading className="heroHeading" subtitle size={4}>This web app was made as a small project in order to practice creating backends with Spring Boot. The purpose of this extremely-minimal frontend made in React (w/ Bulma) is to allow others to easily test the API/endpoints without having to create requests using various tools such as Postman. Below you'll see sections divided by the specific endpoint, with a small description of what the requirements are to create a successful request, as well as what will be expected as a result. <br/><br/> Most inputs will be pre-filled with the correct data necessary to make a successful request. You can of course modify the input to see what the result will be. If you're not sure what data to use, you can always go and copy-paste the data from the block below which contains the initial data that is loaded when the app starts and will therefore always result in a successful request.</Heading>
                </Hero>
            </Section>
        )
    }
}

export default WebAppInformationSection;