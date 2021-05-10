import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/index";
import NavBar from "../component/Navbar"
import "../style/index.scss";
import { createWrapper } from "next-redux-wrapper";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAction } from "../hooks/useAction";
import { SnackbarProvider } from 'notistack';
import getConfig from "next/config";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFDE03'
        },
        secondary: {
            main: '#0036FF'
        },
    },
})

const { publicRuntimeConfig } = getConfig();

const MyApp = ({ Component, pageProps }) => {
    const { addPizzaToBasket, LoginLocal, setUserLocal, Logout } = useAction()
    React.useEffect(() => {
        const pizzaBasket = JSON.parse(localStorage.getItem('pizzaBasket'))
        if(pizzaBasket) pizzaBasket.map(item => addPizzaToBasket(item))
        const token: string | null = localStorage.getItem('token')
        if (token !== null) {
            LoginLocal(token)
            setUser(token)
        }
    }, [])

    const setUser = async (token: string) => {
        const response = await fetch(publicRuntimeConfig.backendUri + "/auth", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        if (response.status === 200) {
            setUserLocal(await response.json());
        } else {
            Logout()
        }
    }

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentElement) {
          jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={10}>
                    <NavBar/>
                    <div style={{marginTop: 70}}>
                        <Component {...pageProps} />
                    </div>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)