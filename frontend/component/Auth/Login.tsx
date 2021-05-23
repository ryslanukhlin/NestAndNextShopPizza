import React, { MouseEventHandler } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import style from '../../style/auth.module.scss';
import { TLoginForm } from '../../types/form/login-form.type';
import getConfig from 'next/config'
import { useSnackbar } from 'notistack';
import { useAction } from '../../hooks/useAction';
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";

const { publicRuntimeConfig } = getConfig();

const LoginPage: React.FC<{ goRegister: MouseEventHandler, handleClose: Function}> = ({ goRegister, handleClose }) => {
    const [remMe, setRemMe] = React.useState<boolean>(false);
    const { LoginLocal, LoginGoogle, setUserLocal } = useAction();
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
            LoginLocal(data.access_token)
            handleClose()
            if (remMe) localStorage.setItem('token', data.access_token);
            setUser(data.access_token)
        }
    }

    const setUser = async (token: string) => {
        const response = await fetch(publicRuntimeConfig.backendUri + "/auth", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        setUserLocal(await response.json());
    }

    const responseSuccessGoogle = async (resolve: GoogleLoginResponse): Promise<void> => {
        const {email, name, googleId, imageUrl} = resolve.profileObj
        const response = await fetch(publicRuntimeConfig.backendUri + '/users/google', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, googleId, nicname: name, icon: imageUrl})
        })
        LoginGoogle(await response.json())
        handleClose()
    }
    
    const responseErrorGoogle = (): void => {
        enqueueSnackbar("не удалось войти в гугл", { variant: "error" });
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
                label="Почта"
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
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                value={remMe}
                onChange={setRemMe.bind(null, prev => !prev)}
                control={<Checkbox value="remember" color="primary" />}
                label="Запомнить меня"
            />
            <Button
                onClick={login}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Войти
            </Button>
            <Grid container className={style.modalFooter}>
                <Grid item xs />
                <Grid item>
                    <Typography className={style.customLink} variant="inherit" onClick={goRegister}>
                        У вас нет учетной записи? Зарегестрироваться
                    </Typography>
                </Grid>
            </Grid>
            <GoogleLogin
                className={style.auth__google}
                clientId="1039089113540-k5pkcpnsa4eq6446risiup8sh6cn418g.apps.googleusercontent.com"
                buttonText="Войти через google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default LoginPage
