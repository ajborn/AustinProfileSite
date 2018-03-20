import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import Dialog from './Dialog';
import { getTwitterData } from '../utils/twitter-api';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import SvgIcon from 'material-ui/SvgIcon';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class TwitterAPI extends Component {

    constructor() {
        super()
        this.state = {  };
    }
    getTwitter(){
       return getTwitterData().then((twitterData) => {
            this.setState({twitterData});
        });
    }

    getTwitterSearch(){

    }

    componentDidMount() {
        this.getTwitter();
    }

    render() {
        const styles = {
            button: {
                margin: 12,
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };
        let twitterData = this.state.twitterData;
        let ids = [];
        console.log("twitterData: ", twitterData);
        for (var prop in twitterData) {
            
            ids.push(twitterData[prop].id);
        }
        console.log("ids: ", ids);
        return (
            <div>
                <Nav />

                <div className="container">
                    <h2 className="text-center">TwitterAPI Examples</h2>
                    <hr />
                    <Card>
                        <CardHeader title="TwitterAPI" avatar="images/avatar.jpg" />
                        <CardTitle title="About me" />
                        <CardText>
                            {ids}
                        </CardText>
                        <CardActions>
                        </CardActions>

                    </Card>
                </div>
            </div>
        );
    }
}

export default TwitterAPI;