import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
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
            mappedTwitterData: [],
            searchTerm: null,
            maxResults: null,
            page: 1
        };
    }
    getTwitter() {
        return getTwitterData().then((twitterData) => {
            this.setState({ twitterData });
        });
    }
    getTwitterSearch(nextPage) {
        console.log("this.state.searchTerm", this.state.searchTerm);
        if (!this.state.searchTerm) {
            console.log("Search term was null");
            return;
        }

        let maxResults = this.state.maxResults == null ? 0 : this.state.maxResults
        let page = !nextPage ? this.state.page : nextPage;
        getTwitterSearchData(this.state.searchTerm, page, maxResults).then((twitterSearchData) => {
            let mappedTwitterData = [];
            for (var prop in twitterSearchData) {
                mappedTwitterData.push(twitterSearchData[prop]);
            }
            console.log("this.state.page: ", this.state.page);
            console.log("twitterSearchData: ", twitterSearchData);
            this.setState({ mappedTwitterData });
            return;
        });
    }
    searchForMoreUsers() {
        let page = this.state.page + 1;
        this.getTwitterSearch(page);
        this.setState({ page });
    }
    back() {
        let page = this.state.page > 1 ? this.state.page - 1 : this.state.page
        this.getTwitterSearch(page);
        this.setState({ page });

    }
    handleSearchTermChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
        });
    };
    handleMaxResultsChange = (event) => {
        this.setState({
            maxResults: event.target.value,
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
                marginLeft: 18,
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
                            onChange={this.handleSearchTermChange}
                            hintText="Search word"
                        />
                        <TextField
                            name="maxResults"
                            style={styles.textField}
                            value={this.state.maxResults}
                            onChange={this.handleMaxResultsChange}
                            hintText="Max Results"
                        />
                        <RaisedButton
                            target="_blank"
                            label="Search Twitter Users"
                            primary={true}
                            style={styles.button}
                            onClick={() => this.getTwitterSearch()}
                        />
                    </span>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Profile Image</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Latest Tweet</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mappedTwitterData.map((data, index) => (
                                <TableRow>
                                    <TableRowColumn>{index}</TableRowColumn>
                                    <TableRowColumn>{<img src={data.profile_image_url} />}</TableRowColumn>
                                    <TableRowColumn>{data.name}</TableRowColumn>
                                    <TableRowColumn>{!data.status ? '' : data.status.text}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table><br />
                    <RaisedButton
                        target="_blank"
                        label="Back"
                        primary={true}
                        style={styles.button}
                        onClick={() => this.back()}
                    />
                    <RaisedButton
                        target="_blank"
                        label="Search more"
                        primary={true}
                        style={styles.button}
                        onClick={() => this.searchForMoreUsers()}
                    />
                </div>
            </div>
        );
    }
}

export default TwitterAPI;