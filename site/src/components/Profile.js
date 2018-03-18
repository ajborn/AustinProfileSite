import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import Dialog from './Dialog';
import { getFoodData } from '../utils/chucknorris-api';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import SvgIcon from 'material-ui/SvgIcon';
import { getAboutMeData } from '../utils/profile-api';
import { login, logout, isLoggedIn } from '../utils/AuthService';

const GitHubIcon = (props) => (
    <SvgIcon {...props}>
        {<path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />}
    </SvgIcon>
);
class Profile extends Component {

    constructor() {
        super()
        this.state = { aboutme: '' };
    }

    getAboutMe() {
        getAboutMeData().then((aboutme) => {
            this.setState({ aboutme });
        });
    }

    componentDidMount() {
        this.getAboutMe();
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
        const { aboutme } = this.state;
        console.log("aboutme: ", aboutme);
        return (
            <div>
                <Nav />

                <div className="container">
                    <h2 className="text-center">Austin Born - Software Developer</h2>
                    <hr />
                    <Card>
                        <CardHeader title="Austin Born" avatar="images/avatar.jpg" />
                        <CardMedia >
                            <img src="images/glory-universe-banner.jpg" alt="" />
                        </CardMedia>
                        <CardTitle title="About me" />
                        <CardText>
                            {(isLoggedIn()) ? aboutme : <Dialog />}

                        </CardText>
                        <CardActions>
                            <RaisedButton
                                href="https://github.com/ajborn?tab=repositories"
                                target="_blank"
                                label="Github Link"
                                primary={true}
                                style={styles.button}
                                icon={<GitHubIcon />}
                            />
                        </CardActions>

                    </Card>
                </div>
            </div>
        );
    }
}

export default Profile;