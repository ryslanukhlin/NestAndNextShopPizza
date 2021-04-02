import React from "react";
import { IconButton, ListItemSecondaryAction, ListItemText, Typography, ListItemAvatar, ListItem, Avatar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import style from "../style/basket.module.scss"
import { TPizzaBasket } from "../types/reducer/baskeReducer.type";
import { useAction } from "../hooks/useAction";

const BasketItem: React.FC<{ pizza: TPizzaBasket }> = ({ pizza }) => {
    const [count, setCount] = React.useState<number>(1)
    const { removePizzaToBasket, setCountPrice } = useAction()

    React.useEffect(() => {
        setCountPrice({ id: pizza._id, count: count });
    }, [count])

    const changeCount = (e: any) => {
        return setCount((prev) => {
            if(e.target.value > 10 || e.target.value < 1){
                return prev
            }
            return Number.parseInt(e.target.value)
        })
    }

    return (
        <ListItem>
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
            <Typography variant="body1">Количество: </Typography>
            <div className={style.row}>
                <input 
                    className={style.customInput}
                    type="number"
                    value={count}
                    onChange={changeCount}
                    step="1" 
                    min="1" 
                    max="10" 
                />
            </div>
            <Typography variant="h6">{pizza.countPrice} ₽</Typography>
            <ListItemSecondaryAction onClick={removePizzaToBasket.bind(null, pizza._id)}>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default BasketItem