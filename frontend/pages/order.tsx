import React from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import style from "../style/order.module.scss"
import { TOrderForm, TProductParams } from "../types/form/order-form.type";
import InputMask from "react-input-mask";
import getConfig from 'next/config'
import { useTypedSelector } from "../hooks/useTypeSelector";
import { SnackbarKey, useSnackbar } from 'notistack';
import { useAction } from "../hooks/useAction";
React.useLayoutEffect = React.useEffect; 

const { publicRuntimeConfig } = getConfig();

const Order: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { clearBasket } = useAction();
    const { allPrice, basketPizza } = useTypedSelector(state => state.basketReducer)
    const [formOrder, setOrderForm] = React.useState<TOrderForm>({
        name: '',
        adress: '',
        tell: '',
        optionst: ''
    });

    const formChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOrderForm({...formOrder, [e.target.name]: e.target.value})
    }

    const addOrder = async (): Promise<void | SnackbarKey> => {
        if(basketPizza.length === 0) return enqueueSnackbar("basket null", { variant: "error" });
        const productParams = basketPizza.map((item): TProductParams => {
            return { productId: item._id, count: item.count}
        })
        const response = await fetch(publicRuntimeConfig.backendUri + "/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formOrder, price: allPrice, product: productParams})
        });
        if(response.status === 201){
            enqueueSnackbar('is Add Order', { variant: "success" })
            clearBasket()
            let clearForm: TOrderForm = formOrder;
            for(let orderItem in formOrder){
                clearForm[orderItem] = ""
            }
            setOrderForm({...clearForm})
        }
        const data = await response.json()
        if(response.status === 400){
            data.message.map(err => {
                enqueueSnackbar(err, { variant: "error" })
            })
        }
    }
    
    return (
        <Container maxWidth="md">
            <Typography className={style.orderTitle} variant="h2">Order</Typography>
            <TextField 
                className={style.orderInput} 
                value={formOrder.name}
                onChange={formChange}
                name="name"
                fullWidth 
                label="your name" 
                variant="outlined" 
            />
            <TextField 
                className={style.orderInput} 
                value={formOrder.adress}
                onChange={formChange}
                name="adress"
                fullWidth 
                label="adress" 
                variant="outlined" 
            />
            <InputMask
                mask="+7(999) 9999 99-99"
                name="tell"
                value={formOrder.tell}
                onChange={formChange}
            >
                <TextField label="tell"  fullWidth variant="outlined" type="tell" />
            </InputMask>
            <TextField 
                className={style.orderInput} 
                value={formOrder.optionst}
                onChange={formChange}
                name="optionst"
                fullWidth 
                multiline 
                rows={4} 
                label="optionst"
                variant="outlined" 
            />
            <div className={style.actions}>
                <Button variant="contained" color="secondary" onClick={addOrder}>Order</Button>
            </div>
        </Container>
    )
}

export default Order