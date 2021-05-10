import React from "react"
import { List, Container, Typography, Button } from "@material-ui/core"
import { useTypedSelector } from "../hooks/useTypeSelector";
import style from "../style/basket.module.scss"
import { useAction } from "../hooks/useAction";
import BasketItem from "../component/BasketItem";
import { useRouter } from 'next/dist/client/router';

const Basket: React.FC = () => {
    const router = useRouter()
    const { basketPizza, allPrice } = useTypedSelector(state => state.basketReducer)
    const { setAllPrice } = useAction()

    React.useEffect(() => {
        setAllPrice()
    }, [basketPizza.length])

    const toOrder = async (): Promise<void> => {
        await router.push('/order')
    }

    if(basketPizza.length == 0){
        return <Typography className={style.basketTitle} variant="h2">Basket is null</Typography>
    }

    return (
        <Container maxWidth="md">
            <Typography className={style.basketTitle} variant="h2">Basket</Typography>
            <List>
                {basketPizza.map(pizza => 
                    <BasketItem key={pizza._id} pizza={pizza} />
                )}
            </List>
            <div className={style.customHr} />
            <div className={style.orderWrapper}>
                <Typography style={{ flexGrow: 1 }} variant="h5">Total Price: {allPrice} ₽</Typography>
                <Button variant="contained" color="secondary" onClick={toOrder}>Order</Button>
            </div>
        </Container>
    )   
}

export default Basket