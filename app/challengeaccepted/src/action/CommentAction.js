import * as customData from './post.json';
import React, { Component } from 'react';
//All Insert Action to DB
class CommentAction extends Component
{
    constructor()
    {

    }

    static async SendComment(post_id,created,text,created_date)
    {

      //Send Comment to the server
        var d = new Date();
        dst = d.toLocaleDateString();

        URL ='https://challenge-accepted-mta.herokuapp.com/add_comment';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        post_id:post_id,
        created:created,
        text:text,
        created_date:dst
      
  }),
  }).then(data => console.log(data));
}
      
    


}
export default CommentAction;