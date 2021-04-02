import React from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import style from "../style/order.module.scss"

const Order: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Typography className={style.orderTitle} variant="h2">Order</Typography>
            <TextField className={style.orderInput} fullWidth label="yout name" variant="filled" />
            <TextField className={style.orderInput} fullWidth label="adress" variant="filled" />
            <TextField className={style.orderInput} fullWidth label="tell" variant="filled" />
            <TextField className={style.orderInput} fullWidth label="price" variant="filled" />
            <TextField className={style.orderInput} fullWidth multiline rows={4} label="price" variant="filled" />
            <div className={style.actions}>
                <Button variant="contained" color="secondary">Order</Button>
            </div>
        </Container>
    )
}

export default Order