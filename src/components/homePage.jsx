import React, {Component} from 'react';
import query from "querystring";
import axios from "axios";
import TechList from "./techList";
import LeaderBoard from "./leaderBoard";


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            techs: []
        }
    }

    async componentDidMount() {
        if(localStorage.getItem('isAuthenticated') !== 'true') {
            this.props.history.push({
                pathname: '/'
            });
        }

        const {data: techs} = await axios.get('http://localhost:3003/api/v1/techs');
        this.setState({techs});

    }

    render() {
        return (
            <div className='d-flex flex-row m-2 justify-content-between'>
                <div style={{width: '60%', height: '700px'}}>
                    <TechList techs={this.state.techs} onHClick={this.handleClick}/>
                </div>
                <div style={{width: '30%', height: '700px'}}>
                    <LeaderBoard/>
                </div>
            </div>
        );
    }

    handleClick = (techName) => {
        console.log('Join button clicked', techName);
        this.props.history.push({
            pathname: 'tech-details',
            search: query.stringify({tech: techName})
        });
    };


}

export default HomePage;