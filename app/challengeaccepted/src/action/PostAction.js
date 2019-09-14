class PostAction
{
  //Post action to DB
    constructor()
    {

    }


    static async  InsertLike(post_id,created)
    {
      //Insert Like to db
        URL ='https://challenge-accepted-mta.herokuapp.com/add_like';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        post_id:post_id,
        created:created
      
  }),
  }).then(data => console.log(data));
    }

    static async RemoveLike(post_id,created)
    {
            //Remove Like

        URL ='https://challenge-accepted-mta.herokuapp.com/unlike';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        post_id:post_id,
        created:created
      
  }),
  }).then(data => console.log(data));
    }

    static async DeleteChallenge(post_id,user_name)
    {            //Delete Challenge

        URL ='https://challenge-accepted-mta.herokuapp.com/unchallenge';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user_name:user_name,
        post_id:post_id
      
  }),
  }).then(data => console.log(data));
    }



    static async InsertChallenge(post_id,user_name)
    {
       //Insert Challenge
        URL ='https://challenge-accepted-mta.herokuapp.com/take_challenge';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user_name:user_name,
        post_id:post_id
      
  }),
  }).then(data => console.log(data));
    }

}


export default PostAction;