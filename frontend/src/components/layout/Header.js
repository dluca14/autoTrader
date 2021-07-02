import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {logout} from "../../actions/accounts";
import {PropTypes} from "prop-types";
import {Button} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Dropdown from "../common/Dropdown";

import CoinPairs from "../trading/CoinPairs";
import Periods from "../trading/Periods";

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {paths} from "../../Paths";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 635,
    },
    button: {
        margin: '0px 3px',
        color: "white"
    },
    name: {
        display: "inline",
        marginRight: "9px"
    },
    dropdownIcon: {
        color: "white"
    }
}));


const Header = (props) => {
    const classes = useStyles();
    const coins = CoinPairs();
    const periods = Periods();

    const {isAuthenticated, user} = props.auth


    const guestLinks = (
        <div>
            <Button component={Link} to={paths.Login} variant="outlined" className={classes.button}>
                Login
            </Button>
        </div>
    );

    const authLinks = [
        <div>
            <Typography variant="body2" className={classes.name}>
                {user ? `Welcome ${user.first_name}!` : ""}
            </Typography>
        </div>,
        <Dropdown options={coins} icon={<AttachMoneyIcon className={classes.dropdownIcon}/>}/>,
        <Dropdown options={periods}  icon={<AccessTimeIcon className={classes.dropdownIcon}/>}/>,
        <div>
            <IconButton color="inherit">
                <AccountBoxIcon/>
            </IconButton>
            <IconButton onClick={props.logout} color="inherit">
                <ExitToAppIcon/>
            </IconButton>
        </div>
    ];

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
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