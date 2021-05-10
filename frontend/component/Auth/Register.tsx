import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { MouseEventHandler } from 'react';
import style from '../../style/auth.module.scss';
import { TRegisterForm } from '../../types/form/register-form.type';
import getConfig from 'next/config'
import {SnackbarKey, useSnackbar} from 'notistack';

const { publicRuntimeConfig } = getConfig();

const RegisterPage: React.FC<{ goLogin: MouseEventHandler }> = ({ goLogin }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [registerForm, setRegisterForm] = React.useState<TRegisterForm>({
        nicname: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const changeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value})
    }

    const register = async (): Promise<void | SnackbarKey> => {
        if(registerForm.password !== registerForm.repeatPassword) {
            return enqueueSnackbar('passwords don\'t match', { variant: "error" })
        }
        const response = await fetch(publicRuntimeConfig.backendUri + "/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...registerForm})
        });

        if(response.status === 201){
            enqueueSnackbar('registration was successful', { variant: "success" })
            let clearForm: TRegisterForm = registerForm;
            for(let orderItem in registerForm){
                clearForm[orderItem] = ""
            }
            setRegisterForm({...clearForm})
        }
        const data = await response.json()
        if(response.status === 400){
            data.message.map(err => {
                enqueueSnackbar(err, { variant: "error" })
            })
        }
    }

    return (
        <div>
            <Typography variant="h6">Регистрация на FamulyPizza</Typography>
            <TextField
                value={registerForm.nicname}
                onChange={changeForm}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nicname"
                name="nicname"
            />
            <TextField
                value={registerForm.email}
                onChange={changeForm}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
            />
            <TextField
                value={registerForm.password}
                onChange={changeForm}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
            />
            <TextField
                value={registerForm.repeatPassword}
                onChange={changeForm}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat-password"
                type="password"
            />
            <Button
                onClick={register}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign Up
            </Button>
            <Grid container className={style.modalFooter}>
                <Grid item xs />
                <Grid item>
                    <Typography className={style.customLink} variant="inherit" onClick={goLogin}>
                        Do have an account? Sign In
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default RegisterPage
