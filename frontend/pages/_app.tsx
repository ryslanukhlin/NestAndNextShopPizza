import { Provider } from "react-redux";
import { store } from "../store/index";
import NavBar from "../component/Navbar"
import "../style/index.scss";
import { createWrapper } from "next-redux-wrapper";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from "react";
import { useAction } from "../hooks/useAction";

const theme = createMuiTheme({
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

    useEffect(() => {
        const pizzaBasket = JSON.parse(localStorage.getItem('pizzaBasket'))
        if(pizzaBasket){
            pizzaBasket.map(item => addPizzaToBasket(item))
        }
    }, [])

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)