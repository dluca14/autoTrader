import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {logout} from "../../actions/accounts";
import {Button, Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


import HeaderDropdown from "./HeaderDropdown";

import CoinPairs from "../common/trading/CoinPairs";
import Periods from "../common/trading/Periods";

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {paths} from "../common/Paths";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        paddingLeft: '24px'
    },
    navigationButton: {
        margin: 7
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: '0px 3px',
        color: "white"
    },
    dropdownIcon: {
        color: "white"
    },
    drawer: {
        width: 317,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    user: {
        marginRight: "auto",
        marginLeft: 8,
        fontSize: 17,
        textTransform: "none"
    }
}));

//TODO display dropdowns based on selected page (only on predictions & chartview)
const Header = (props) => {
    const classes = useStyles();
    const coins = CoinPairs();
    const periods = Periods();

    const {isAuthenticated, user} = props.auth

    const [state, setState] = React.useState({
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const menuOptions = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className={classes.drawer}
        >
            <div className={classes.drawerHeader}>
                <Button color="primary"
                        variant="outlined"
                        startIcon={<PersonIcon/>}
                        className={classes.user}
                        size="large"
                        component={RouterLink}
                        to={paths.Profile}
                >
                    {user ? `${user.first_name} ${user.last_name}` : "Profile"}
                </Button>
                <IconButton>
                    <ClearIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem button component={RouterLink} to={paths.Home}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary={'Home'}/>
                </ListItem>
                <ListItem button component={RouterLink} to={paths.Heatmap}>
                    <ListItemIcon><ExploreIcon/></ListItemIcon>
                    <ListItemText primary={'Heatmap'}/>
                </ListItem>
                <ListItem button component={RouterLink} to={paths.Portfolio}>
                    <ListItemIcon><DonutLargeIcon/></ListItemIcon>
                    <ListItemText primary={'Portfolio'}/>
                </ListItem>
                <ListItem button component={RouterLink} to={paths.Predictions}>
                    <ListItemIcon><MultilineChartIcon/></ListItemIcon>
                    <ListItemText primary={'Predictions'}/>
                </ListItem>
                <ListItem button component={RouterLink} to={paths.Sentiment}>
                    <ListItemIcon><SentimentVerySatisfiedIcon/></ListItemIcon>
                    <ListItemText primary={'Data vs Sentiment'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button onClick={props.logout}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary={'Logout'}/>
                </ListItem>
            </List>
        </div>
    );


    const guestLinks = (
        <div>
            <RouterLink
                component={Button}
                to={paths.Login}
                variant="outlined"
                className={classes.button}
            >
                Login
            </RouterLink>
        </div>
    );

    const authLinks = [
        <Divider orientation="vertical" flexItem/>,
        <HeaderDropdown options={coins} icon={<AttachMoneyIcon className={classes.dropdownIcon}/>}/>,
        <Divider orientation="vertical" flexItem/>,
        <HeaderDropdown options={periods} icon={<AccessTimeIcon className={classes.dropdownIcon}/>}/>,
        <Divider orientation="vertical" flexItem/>,
        <div>
            <React.Fragment key={'right'}>
                <IconButton
                    color="inherit"
                    className={classes.navigationButton}
                    onClick={toggleDrawer('right', true)}
                >
                    <MenuIcon/>
                </IconButton>
                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                    {menuOptions('right')}
                </Drawer>
            </React.Fragment>

        </div>
    ];

    return (
        <AppBar>
            <Toolbar className={classes.toolbar} disableGutters={true}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    Auto Trader
                </Typography>
                {isAuthenticated ? authLinks : guestLinks}
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header);