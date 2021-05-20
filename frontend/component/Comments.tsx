import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {TComments} from "../types/pizza.type";
import style from "../style/comment.module.scss";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();

const Comments: React.FC<{ comments: TComments[] }> = ({ comments }) => {
    return (
        <List>
            <Typography className={style.commentTitle} variant="h6">{comments.length} комментария</Typography>
            {comments.map((comment: TComments) =>
                <ListItem key={comment._id}>
                    <ListItemAvatar>
                        <Avatar src={comment.userId.icon?
                            publicRuntimeConfig.backendUri + "/" + comment.userId.icon
                            :
                            "/dontIconUser.png"} 
                        />
                    </ListItemAvatar>
                    <ListItemText primary={comment.userId.nicname} secondary={comment.text} />
                </ListItem>
            )}
        </List>
    );
};

export default Comments;