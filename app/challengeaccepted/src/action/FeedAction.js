class FeedAction
{
    //All Insert Action to DB
    constructor()
    {

    }



    static async  InsertStatus(created,type,text)
    {
        //Insert Status to server
        var d = new Date();
        dst = d.toLocaleDateString();
        URL ='https://challenge-accepted-mta.herokuapp.com/create_post';
        fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        created:created,
        type:type,
        text:text,
        created_date:dst
      
  }),
  }).then(data => console.log(data));
    }

}
export default FeedAction;