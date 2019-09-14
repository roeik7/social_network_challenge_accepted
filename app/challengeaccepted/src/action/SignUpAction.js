class SignUpAction
{
  //All Insert Action to DB
    constructor()
    {

    }


    static async InsertUSER(user_name,image_url,password)
    {
      //InsertUser
        URL ='https://challenge-accepted-mta.herokuapp.com/sign_up';
            fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: user_name,
          image_url:image_url,
          password:password
      }),
      }).then(data => console.log(data));
    }
    
     
}
export default SignUpAction;