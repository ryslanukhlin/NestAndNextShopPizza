import { Provider } from "react-redux";
import { store } from "../store/index";
import NavBar from "../component/Navbar"
import "../style/index.scss";
import { createWrapper } from "next-redux-wrapper";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


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