import React from "react"
import { IconButton, List, ListItemSecondaryAction, ListItemText, Container, Typography, ListItemAvatar, ListItem, Avatar, TextField } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import { useTypedSelector } from "../hooks/useTypeSelector";
import style from "../style/basket.module.scss"
import { useAction } from "../hooks/useAction";

const Basket: React.FC = () => {
    const pizzaBasket = useTypedSelector(state => state.basketReducer.basketPizza)
    const { removePizzaToBasket } = useAction()

    if(pizzaBasket.length == 0){
        return <Typography className={style.basketTitle} variant="h2">Basket is null</Typography>
    }

    return (
        <Container maxWidth="md">
            <Typography className={style.basketTitle} variant="h2">Basket</Typography>
            <List>
                {pizzaBasket.map(pizza => 
                    <ListItem key={pizza._id}>
                        <ListItemAvatar>
                            <Avatar>
                                <img className={style.basketImage} src={'http://localhost:8000/' + pizza.image} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            className={style.basketText}
                            primary={pizza.name}
                            secondary={pizza.description}
                        />
                        <TextField className={style.basketInputCount}  type="number" label="count"/>
                        <Typography variant="h6">{pizza.price} ₽</Typography>
                        <ListItemSecondaryAction onClick={removePizzaToBasket.bind(null, pizza._id)}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            <div className={style.customHr} />
        </Container>
    )   
}

export default Basket