import React, { MouseEventHandler } from 'react';
import { Dialog } from '@material-ui/core';
import style from '../../style/auth.module.scss';
import Login from './Login';
import Register from './Register';

const Auth: React.FC<{open: boolean, handleClose: MouseEventHandler}> = ({open, handleClose}) => {
    const [isLogin, setIsLogin] = React.useState<boolean>(true)

    const goRegister = () => {
        setIsLogin(false)
    }

    const goLogin = () => {
        setIsLogin(true)
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth="md">
                <div className={style.wrapper}>
                    <img src="/bg_auth.webp" alt="my_image" className={style.bg}/>
                    <div className={style.form}>
                        {isLogin?
                            <Login goRegister={goRegister} />
                        :
                            <Register goLogin={goLogin} />
                        }
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Auth
