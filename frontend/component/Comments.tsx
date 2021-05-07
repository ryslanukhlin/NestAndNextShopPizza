import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {TComments} from "../types/pizza.type";

const Comments: React.FC<{ comments: TComments[] }> = ({ comments }) => {
    const primary = 'Birthday Gift'
    const secondary = `Do you have a suggestion for a good present for John on his workanniversary. I am really confused & would love your thoughts on it.`

    return (
        <List>
            {comments.map((comment: TComments) =>
                <ListItem key={comment._id}>
                    <ListItemAvatar>
                        <Avatar src="https://w7.pngwing.com/pngs/336/946/png-transparent-avatar-user-medicine-surgery-patient-avatar-face-heroes-head.png" />
                    </ListItemAvatar>
                    <ListItemText primary={comment.userId} secondary={comment.text} />
                </ListItem>
            )}
        </List>
    );
};

export default Comments;