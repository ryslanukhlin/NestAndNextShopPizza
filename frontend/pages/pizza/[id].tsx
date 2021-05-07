import React from 'react';
import {GetServerSideProps} from "next";
import {TComments, TPizza} from "../../types/pizza.type";
import {Container} from "@material-ui/core";
import CommentForm from "../../component/CommentForm";
import style from "../../style/pizzaItem.module.scss";
import ItemPizzaId from "../../component/ItemPizzaId";
import io from "socket.io-client";
import Comments from "../../component/Comments";

const PagesPizza: React.FC<{ data: TPizza }> = ({ data}) => {
    const [pizza, setPizza] = React.useState<TPizza>(data)
    const socketRef = React.useRef<any>();

    React.useEffect(() => {
        if (typeof window !== "undefined"){
            socketRef.current = io('http://localhost:8000')
            socketRef.current.emit("COMMENT:ROOM", data._id)
            socketRef.current.on("COMMENT:REFRESH", (product: TPizza) => setPizza(product))
        }
        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    const addComment = (text: string, e: React.MouseEventHandler<HTMLButtonElement>) => {
        socketRef.current.emit('COMMENT:ADD', {
            text,
            userId: "607fd68666abfb253428a22a",
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
    const response = await fetch(`http://localhost:8000/product/${params.id}`);
    if (response.status !== 200 ) return { notFound: true }
    const data: TPizza = await response.json();
    return { props: { data } }

}

export default PagesPizza;