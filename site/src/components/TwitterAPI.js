import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import Dialog from './Dialog';
import { getTwitterData, getTwitterSearchData } from '../utils/twitter-api';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import SvgIcon from 'material-ui/SvgIcon';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class TwitterAPI extends Component {

    constructor() {
        super()
        this.state = {
            searchTerm: "singer",
            count: 10
        };
    }
    getTwitter() {
        return getTwitterData().then((twitterData) => {
            this.setState({ twitterData });
        });
    }
    getTwitterSearch() {
        if (!this.state.searchTerm) {
            console.log("Search term was null");
            return;
        }
        getTwitterSearchData(this.state.searchTerm, this.state.count).then((twitterSearchData) => {
            this.setState({ twitterSearchData });
        });
    }

    componentDidMount() {
        this.getTwitterSearch();
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
        let twitterSearchData = this.state.twitterSearchData;
        let mappedTwitterData = [];
        console.log("twitterSearchData: ", twitterSearchData);
        for (var prop in twitterSearchData) {
            mappedTwitterData.push(twitterSearchData[prop]);
        }
        mappedTwitterData.map((id, index) => (
            console.log("id: ", id.id)
        ))
        return (
            <div>
                <Nav />

                <div className="container">
                    <h2 className="text-center">TwitterAPI Examples</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mappedTwitterData.map((data, index) => (
                                <TableRow>
                                    <TableRowColumn>{data.id}</TableRowColumn>
                                    <TableRowColumn>{data.name}</TableRowColumn>
                                    <TableRowColumn>{data.status.text}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default TwitterAPI;