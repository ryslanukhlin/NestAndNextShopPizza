import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import style from "../style/catalog.module.scss"
import { PizzaProps } from '../types/proptype/pizza.type'

const CatalogItem: React.FC<{pizza: PizzaProps}> = ({pizza}) => {
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
                <Button>add basket</Button>
                <Button>detailed</Button>
            </CardActions>
        </Card>
    )
}

export default CatalogItem