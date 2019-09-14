import * as customData from './post.json';
import React, { Component } from 'react';

//All Insert Action to DB
class ChallengeAction extends Component
{
    constructor()
    {

    }
    //Get Icon
    static getIcon(type)
    {
      if (type == "Run")
      {
       return "running";
    }
      else if (type=="Bicycle")
      { return "bicycle";}
      else if (type=="Video")
          {return "video";}
      else
      {return "diaspora"}
    
    }


    static async GetChallanges()
    {
          //Get Chellnges types

        try {
            let response = await fetch(
              'https://challenge-accepted-mta.herokuapp.com/choose_challenge_to_complete',
            );
            let responseJson = await response.json();
            return responseJson;
          } catch (error) {
            console.error(error);
          }
      
    }

    static GetMyChallengeListByID(id)
    {
        var result='{"challanges":[{"id":123,"type":"Run","ChallangeType":"speed","number":12,"created":"@roeik","icon":"running"},{"id":12,"type":"Bicycle","ChallangeType":"time","number":14,"created":"@roeik","icon":"bicycle"}]}'
        var resultjs = JSON.parse(result);
        return resultjs;

    }

    static async DoneChallenge(user_name,challenge_id,challenge_type,challenge_criterion,actual_time,actual_distance,number,following)
    {
      //Done Chellnge and send to DB

      console.log(following);
      console.log(user_name);
      var exist=true;
      if (challenge_id==-1)
      {exist=false;}
      var body = JSON.stringify({
        user_name:user_name,
        challenge_id:challenge_id,
        exist:exist,
        challenge_type:challenge_type,
        challenge_criterion:challenge_criterion,
        actual_time:actual_time,
        destination_distance:number,
        actual_distance:actual_distance,
        destination_time:number,
        destination_speed:number,
        challenge_for:following
    });
    console.log(body);
      
      URL ='https://challenge-accepted-mta.herokuapp.com/end_of_challenge';
            fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:body ,
      }).then(res => res.json()).then(data=>console.log(data));


    }

    static async SaveChallenge(user_name,challenge_type,challenge_criterion,icon,number)
    {
      //Save Chellnge and send to DB
      icon = this.getIcon(challenge_type)
      URL ='https://challenge-accepted-mta.herokuapp.com/insert_future_challenge';
            fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: user_name,
          take_from:"" ,
          challenge_type : challenge_type,
          challenge_criterion:challenge_criterion,
          icon:icon,
          destination_distance:number,
          destination_time:number,
          destination_speed:number
          
      }),
      }).then(data => console.log(data));
    }

    static async DoneChallengeVideo(user_name,video_url)
    {
      //Done Video Chellnge and send to DB

      var data =JSON.stringify({
        user_name:user_name,
        challenge_id:-1,
        exist:false,
        challenge_type:"Video",
        challenge_criterion:"Video",
        video_url:video_url
        
    })
      console.log(data);
      console.log(video_url);
      URL ='https://challenge-accepted-mta.herokuapp.com/end_of_challenge';
            fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:data ,
      }).then(data => data.text().then(text => console.log(text)));
    }

}
export default ChallengeAction;