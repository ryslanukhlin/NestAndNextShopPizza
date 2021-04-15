import React, { MouseEventHandler } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import style from '../../style/auth.module.scss';
import { TLoginForm } from '../../types/form/login-form.type';
import getConfig from 'next/config'
import { useSnackbar } from 'notistack';
import { useAction } from '../../hooks/useAction';

const { publicRuntimeConfig } = getConfig();

const LoginPage: React.FC<{ goRegister: MouseEventHandler}> = ({ goRegister }) => {
    const { Login } = useAction();
    const { enqueueSnackbar } = useSnackbar();
    const [loginForm, setLoginForm] = React.useState<TLoginForm>({
        email: "",
        password: ""
    });

    const changeForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const login = async (): Promise<void> => {
        const response = await fetch(publicRuntimeConfig.backendUri + "/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...loginForm})
        });
        if(response.status !== 201){
            enqueueSnackbar("invalid password or email", { variant: "error" });
        } else {
            const data = await response.json()
            Login(data.access_token)
        }
    }

    return (
        <div>
            <Typography variant="h6">Вход на FamulyPizza</Typography>
            <TextField
                value={loginForm.email}
                onChange={changeForm}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
            />
            <TextField
                value={loginForm.password}
                onChange={changeForm}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                onClick={login}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign In
            </Button>
            <Grid container className={style.modalFooter}>
                <Grid item xs />
                <Grid item>
                    <Typography className={style.customLink} variant="inherit" onClick={goRegister}>
                        Don't have an account? Sign Up
                    </Typography>
                </Grid>
            </Grid>
            <a href="http://localhost:8000/auth/google" className={style.auth__googleBtn}>
                <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<img className={style.auth__google}
                    src="/googleIcon.png" 
                />}>Auth Google</Button>
            </a>
        </div>
    )
}

export default LoginPage
