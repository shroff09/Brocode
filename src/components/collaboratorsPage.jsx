import React, {Component} from 'react';
import queryString from "query-string";
import query from "querystring";
import axios from "axios";
import Collaborator from "./collaborator";
import Tech from "./tech";

class CollaboratorsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborators: [],
            techDetails: {}
        }
    }

    async componentDidMount() {
        const {tech} = queryString.parse(this.props.location.search);
        let techDetails = {};
        let collaborators = [];
        try {
            const {data} = await axios.get('http://localhost:3003/api/v1/techs/' + tech);
            techDetails = data;
        } catch (ex) {
            console.log('Exception occured', ex);
        }

        try {
            const {data} = await axios.get('http://localhost:3003/api/v1/techs/collaborators/' + tech);
            collaborators = data;
        } catch (ex) {
            console.log('Exception occured', ex);
        }
        this.setState({collaborators, techDetails});
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