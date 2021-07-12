import React from "react";
import {List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    icon: {
        minWidth: 31
    },
    button: {
        mimWidth: 125,
        maxWidth: 150,
        padding: 'auto'
    }
}));

const HeaderDropdown = ({
                            options,
                            icon,
                            changeState,
                            defaultSelected = 0,
                            disabledOptions = null,
                            show = true
                        }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(defaultSelected);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // The change state callback functions changes the REDUX state - or it can be anything you want
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        changeState(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!show) return null;

    return (
        <div>
            <List component="nav">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    onClick={handleClickListItem}
                    className={classes.button}
                >
                    {icon && <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>}
                    <ListItemText primary={options[selectedIndex]}/>
                </ListItem>
            </List>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        disabled={index === selectedIndex || disabledOptions && disabledOptions.includes(index)}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default HeaderDropdown;