import React from "react";
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {logout} from "../../actions/auth";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: '0px 3px',
        color: "white"
    }
}));

const Header = (props) => {
    const classes = useStyles();

    const {isAuthenticated, user} = props.auth

    const guestLinks = (
        <div>
            <Button component={Link} to="/login" variant="outlined" className={classes.button}>
                Login
            </Button>
            <Button component={Link} to="/register" variant="outlined" className={classes.button}>
                Register
            </Button>
        </div>
    );

    const authLinks = (
        <div>
            <Button onClick={props.logout} variant="outlined" className={classes.button}>
                Logout
            </Button>
        </div>
    );


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Auto Trader
                </Typography>
                {isAuthenticated ? authLinks : guestLinks}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header);