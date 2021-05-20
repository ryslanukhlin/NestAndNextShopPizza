import React from 'react';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useAction} from "../hooks/useAction";
import {TPizza} from "../types/pizza.type";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const ItemPizzaId: React.FC<{ data: TPizza }> = ({ data }) => {
    const pizzaBasket = useTypedSelector(state => state.basketReducer.basketPizza)
    const isAddBasket = pizzaBasket.filter(item => item._id === data._id).length === 0
    const { addPizzaToBasket, removePizzaToBasket } = useAction()

    return (
        <Grid container>
            <Grid xs={6} item>
                <img src={publicRuntimeConfig.backendUri + '/' + data.image} alt="img"/>
            </Grid>
            <Grid xs={6} item>
                <Typography variant="h3">{data.name}</Typography>
                <Typography variant="h5">Price: {data.price}</Typography>
                <Typography paragraph>{data.description}</Typography>
                {isAddBasket ?
                    <Button onClick={addPizzaToBasket.bind(null, data)}>Добавить</Button>
                    :
                    <Button onClick={removePizzaToBasket.bind(null, data._id)}>Удалить</Button>
                }
            </Grid>
        </Grid>
    );
};

export default ItemPizzaId;