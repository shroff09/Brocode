import React, {Component} from 'react';
import queryString from "query-string";
import collaboratorData from "../data/collaborators.json";
import techData from "../data/technologies.json";
import Collaborator from "./collaborator";
import query from "querystring";
import Tech from "./tech";

class CollaboratorsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborators: [],
            techDetails: {}
        }
    }

    componentDidMount() {
        const {tech} = queryString.parse(this.props.location.search);
        const collaborators = this.findCollaborators(tech);
        const techDetails = this.findTechDetails(tech);
        this.setState({collaborators, techDetails});
    }

    findTechDetails(name) {
        for (let i = 0; i < techData.length; i++) {
            if (techData[i].name === name) {
                return techData[i];
            }
        }
    }

    findCollaborators(tech) {
        for (let i = 0; i < collaboratorData.length; i++) {
            if (collaboratorData[i].techName === tech) {
                return collaboratorData[i].collaborators;
            }
        }
    }

    render() {
        const {collaborators, techDetails} = this.state;
        return (
            <>
                <div className='d-flex flex-row justify-content-center'>
                    <Tech key={techDetails.name} techName={techDetails.name} techDescription={techDetails.description}
                          noOfCollaborators={techDetails.collaborators} visibility={{button: false}}/>
                </div>
                <div className='d-flex flex-row justify-content-around flex-wrap'>
                    {collaborators.map(collaborator => <Collaborator name={collaborator.name}
                                                                     rating={collaborator.rating}
                                                                     aboutMe={collaborator.aboutMe}
                                                                     onClick={this.handleClick}/>
                    )}
                </div>
            </>
        );
    }
    handleClick = (name) => {
        this.props.history.push({
            pathname: 'join',
            search: query.stringify({name})
        })
    };
}
export default CollaboratorsPage;