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
import TextField from 'material-ui/TextField'
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
            count: 10,
            mappedTwitterData: []
        };
    }
    getTwitter() {
        return getTwitterData().then((twitterData) => {
            this.setState({ twitterData });
        });
    }
    getTwitterSearch() {
        console.log("this.state.searchTerm", this.state.searchTerm);
        if (!this.state.searchTerm) {
            console.log("Search term was null");
            return;
        }
        getTwitterSearchData(this.state.searchTerm, this.state.count).then((twitterSearchData) => {
            let mappedTwitterData = [];
            for (var prop in twitterSearchData) {
                mappedTwitterData.push(twitterSearchData[prop]);
            }
            console.log("twitterSearchData: ", twitterSearchData);
            this.setState({ mappedTwitterData });
            return;
        });
    }
    handleChange = (event) => {
        this.setState({
          searchTerm: event.target.value,
        });
      };

    componentDidMount() {
        //this.getTwitterSearch();
    }

    render() {
        let mappedTwitterData = this.state.mappedTwitterData
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
            textField: {
                margin: 12,
                position: 'relative'
            }
        };

        return (
            <div>
                <Nav />

                <div className="container">
                    <h2 className="text-center">TwitterAPI Examples</h2>
                    <span>
                        <TextField
                            name="searchText"
                            style={styles.textField}
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                        />
                        <RaisedButton
                            target="_blank"
                            label="Search Twitter Users"
                            primary={true}
                            style={styles.button}
                            onClick={()=>this.getTwitterSearch()}
                        />
                    </span>
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