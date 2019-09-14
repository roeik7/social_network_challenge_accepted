class ProfileAction
{
  //All Insert Action to DB
    constructor()
    {

    }


    

    static async Follow(user_name,follow)
    {
      //Follow someone
        URL ='https://challenge-accepted-mta.herokuapp.com/follow';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: user_name,
      follow:follow,
    
  }),
  }).then(data => console.log(data));

    }


    
    static async UnFollow(user_name,follow)
    {
      //UnFollow someone
        URL ='https://challenge-accepted-mta.herokuapp.com/unfollow';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: user_name,
      follow:follow,
    
  }),
  }).then(data => console.log(data));

    }

}
export default ProfileAction;