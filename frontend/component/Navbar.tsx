import React from 'react';
import { AppBar, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import style from "../style/navbar.module.scss";

const navbarItems = ['main', 'shop', 'blog']

const Navbar = () => {
    const [close, setClose] = React.useState(false)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={setClose.bind(null, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        FamulyPizza
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={close}
                onClose={setClose.bind(null, false)}
                onOpen={setClose.bind(null, true)}
            >
                <List className={style.List}>
                    {navbarItems.map(item => 
                        <ListItem button key={item} onClick={setClose.bind(null, false)}>
                            <ListItemText primary={item} />
                        </ListItem>
                    )}
                </List>
            </SwipeableDrawer>
        </>
    )
}

export default Navbar