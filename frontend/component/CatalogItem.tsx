import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypeSelector'
import style from "../style/catalog.module.scss"
import { TPizza } from '../types/pizza.type'

const CatalogItem: React.FC<{pizza: TPizza}> = ({pizza}) => {
    const { addPizzaToBasket, removePizzaToBasket } = useAction()
    const pizzaBasket = useTypedSelector(state => state.basketReducer.basketPizza)
    const isAddBasket = pizzaBasket.filter(item => item._id === pizza._id).length === 0 ? true : false

    return (
        <Card className={style.card}>
            <CardMedia 
                className={style.CardImage}
                title="Paella dish"
                image={'http://localhost:8000/' + pizza.image}
            />
            <CardContent className={style.cardContent}>
                <Typography variant="h6">
                    {pizza.name}
                </Typography>
                <Typography paragraph>
                    {pizza.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant="button" style={{flexGrow: 1}}>
                    Price: {pizza.price}
                </Typography>
                {isAddBasket ?
                    <Button onClick={addPizzaToBasket.bind(null, pizza)}>add basket</Button>
                    :
                    <Button onClick={removePizzaToBasket.bind(null, pizza._id)}>remove basket</Button>
                }
                <Button>detailed</Button>
            </CardActions>
        </Card>
    )
}

export default CatalogItem