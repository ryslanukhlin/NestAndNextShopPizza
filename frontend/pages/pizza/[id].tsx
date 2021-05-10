import React from 'react';
import {GetServerSideProps} from "next";
import {TPizza} from "../../types/pizza.type";
import {Container} from "@material-ui/core";
import CommentForm from "../../component/CommentForm";
import style from "../../style/pizzaItem.module.scss";
import ItemPizzaId from "../../component/ItemPizzaId";
import io from "socket.io-client";
import Comments from "../../component/Comments";
import {useTypedSelector} from "../../hooks/useTypeSelector";
import { useSnackbar } from 'notistack';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const PagesPizza: React.FC<{ data: TPizza }> = ({ data}) => {
    const {user, isAuth} = useTypedSelector(state => state.userReducer)
    const [pizza, setPizza] = React.useState<TPizza>(data)
    const socketRef = React.useRef<any>();
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (typeof window !== "undefined"){
            socketRef.current = io(publicRuntimeConfig.backendUri)
            socketRef.current.emit("COMMENT:ROOM", data._id)
            socketRef.current.on("COMMENT:REFRESH", (product: TPizza) => setPizza(product))
        }
        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    const addComment = (text: string, e: React.MouseEventHandler<HTMLButtonElement>) => {
        if (!isAuth) return enqueueSnackbar("Чтобы добавить кометарий вы должны войти", { variant: "error" })
        socketRef.current.emit('COMMENT:ADD', {
            text,
            userId: user._id,
            productId: data._id,
        });
    }

    return (
        <Container maxWidth="lg">
            <ItemPizzaId data={pizza} />
            <div className={style.customHr} />
            <CommentForm addComment={addComment} />
            <Comments comments={pizza.comments} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await fetch(`${publicRuntimeConfig.backendUri}/product/${params.id}`);
    if (response.status !== 200 ) return { notFound: true }
    const data: TPizza = await response.json();
    return { props: { data } }

}

export default PagesPizza;