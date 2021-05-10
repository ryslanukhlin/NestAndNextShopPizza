import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {TComments} from "../types/pizza.type";
import style from "../style/comment.module.scss";

const Comments: React.FC<{ comments: TComments[] }> = ({ comments }) => {
    return (
        <List>
            <Typography className={style.commentTitle} variant="h6">{comments.length} комментария</Typography>
            {comments.map((comment: TComments) =>
                <ListItem key={comment._id}>
                    <ListItemAvatar>
                        <Avatar src="https://w7.pngwing.com/pngs/336/946/png-transparent-avatar-user-medicine-surgery-patient-avatar-face-heroes-head.png" />
                    </ListItemAvatar>
                    <ListItemText primary={comment.userId.nicname} secondary={comment.text} />
                </ListItem>
            )}
        </List>
    );
};

export default Comments;