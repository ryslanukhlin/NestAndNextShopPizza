import { Provider } from "react-redux";
import { store } from "../store/index";
import NavBar from "../component/Navbar"
import "../style/index.scss";
import { createWrapper } from "next-redux-wrapper";

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <NavBar />
            <Component {...pageProps} />
        </Provider>
    )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)