import React from 'react';
import { AppBar, Badge, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import style from "../style/navbar.module.scss";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useRouter } from 'next/dist/client/router';
import { useTypedSelector } from '../hooks/useTypeSelector';

const navbarItems = [
    {txt: 'main', link: '/'},
    {txt: 'catalog', link: '/catalog'},
    {txt: 'blog', link: '/blog'},
]

const Navbar = () => {
    const router = useRouter()
    const [close, setClose] = React.useState(false)
    const pizzaBasket = useTypedSelector(state => state.basketReducer.basketPizza)

    const RouteToLink = (link: string): void => {
        setClose(false)
        router.push(link)
    }
    
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
        </>
    )
}

export default Navbar