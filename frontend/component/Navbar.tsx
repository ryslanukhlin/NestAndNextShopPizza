import React from 'react';
import { AppBar, Badge, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import style from "../style/navbar.module.scss";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useRouter } from 'next/dist/client/router';
import { useTypedSelector } from '../hooks/useTypeSelector';
import Auth from './Auth/Auth';

const navbarItems = [
    {txt: 'main', link: '/'},
    {txt: 'catalog', link: '/catalog'},
    {txt: 'blog', link: '/blog'},
]

const Navbar: React.FC = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState<boolean>(true);
    const [close, setClose] = React.useState<boolean>(false)
    const pizzaBasket = useTypedSelector(state => state.basketReducer.basketPizza)

    const RouteToLink = async (link: string): Promise<void> => {
        setClose(false)
        await router.push(link)
    }

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };
    
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={setClose.bind(null, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={style.grow}>
                        FamulyPizza
                    </Typography>
                    <IconButton onClick={RouteToLink.bind(null, '/basket')}>
                        <Badge badgeContent={pizzaBasket.length} color="secondary">
                            <ShoppingBasketIcon />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleClickOpen}>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                open={close}
                onClose={setClose.bind(null, false)}
                onOpen={setClose.bind(null, true)}
            >
                <List className={style.List}>
                    {navbarItems.map(itemNav => 
                        <ListItem button key={itemNav.txt} onClick={RouteToLink.bind(null, itemNav.link)}>
                            <ListItemText primary={itemNav.txt} />
                        </ListItem>
                    )}
                </List>
            </SwipeableDrawer>
            <Auth open={open} handleClose={handleClose}/>
        </>
    )
}

export default Navbar