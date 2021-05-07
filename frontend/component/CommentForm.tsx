import React, {MouseEventHandler} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import style from "../style/comment.module.scss";

const CommentForm: React.FC<{ addComment: (txt: string, e: MouseEventHandler<HTMLButtonElement>) => void}> = ({ addComment }) => {
    const [txt, setTxt] = React.useState<string>('')

    return (
        <>
            <Typography className={style.commentTitle} variant="h6">2 комментария</Typography>
            <TextField
                value={txt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTxt(e.target.value)}
                label="Написать коментарий..."
                fullWidth
                multiline
                rows={4}
                variant="outlined"
            />
            <Button
                onClick={addComment.bind(null, txt)}
                variant="outlined"
                fullWidth
                className={style.commentBtn}
            >
                Отправить
            </Button>
        </>
    );
};

export default CommentForm;