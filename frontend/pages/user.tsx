import { Button, Container, Typography } from '@material-ui/core'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypeSelector'
import style from "../style/user.module.scss"
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();

const user: NextPage = () => {
    const router = useRouter()
    const {isAuth, user} = useTypedSelector(state => state.userReducer)
    const { Logout, setUserLocal } = useAction()

    React.useEffect((): void => {
        if(!isAuth){
            router.back()
        }
    }, [isAuth])
 
    if(!isAuth){
        return <h1>Загрузка...</h1>
    }

    const logout = async (): Promise<void> => {
        await router.push('/');
        Logout()
    }

    const iconDownload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const formData = new FormData()
        formData.append("icon", e.target.files[0])
        formData.append("id", user._id)
        const response = await fetch(publicRuntimeConfig.backendUri + "/users/icon", {
            method: "POST",
            body: formData
        })
        setUserLocal(await response.json());
    }

    return (
        <Container maxWidth="lg" className={style.wrapper}>
            <img 
                className={style.bgUser} 
                src="/bgUserPage.jpg" 
                alt="задний фон" 
            />
            <div className={style.infoWrapper}>
                <img 
                    className={style.photoUser}
                    src={user?.icon ? user.icon : "/dontIconUser.png"} 
                    alt="фотография пользователя" 
                />
                <div className="downloadPhoto" style={{marginBottom: 10}}>
                    <input
                        onChange={iconDownload}
                        style={{display: "none"}}
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                        <label htmlFor="contained-button-file">
                        <Button variant="outlined" size="small" component="span">
                            Загрузить фотографию
                        </Button>
                    </label>
                </div>
                <Typography variant="h5">Ник: {user?.nicname}</Typography>
                <Typography variant="h6">Почта: {user?.email}</Typography>
                <Button className={style.logout} variant="outlined" onClick={logout}>Выйти</Button>
            </div>
        </Container>
    )
}

export default user

