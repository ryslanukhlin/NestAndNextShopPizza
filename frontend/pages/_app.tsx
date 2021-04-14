import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/index";
import NavBar from "../component/Navbar"
import "../style/index.scss";
import { createWrapper } from "next-redux-wrapper";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAction } from "../hooks/useAction";
import { SnackbarProvider } from 'notistack';

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

const MyApp = ({ Component, pageProps }) => {
    const { addPizzaToBasket } = useAction()

    React.useEffect(() => {
        const pizzaBasket = JSON.parse(localStorage.getItem('pizzaBasket'))
        if(pizzaBasket){
            pizzaBasket.map(item => addPizzaToBasket(item))
        }
    }, [])

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
                    <NavBar />
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)