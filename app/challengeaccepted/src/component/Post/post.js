import React from 'react';
import {Component} from 'react';
import Video from 'react-native-video';
import {View, Text, Image,Button} from 'react-native';
import PostHeader from './postHeader';
import ButtonPost from './buttonPost';
import LikeButton from './likeButton';
import AddButton from './addButton';




class Post extends Component{
    constructor(props) 
    {
        super(props);
        console.log("[----------Ctror Pos t--------------]");
        console.log(props);
        //console.log(global.username);
        
    }

    getVideo()
    {
         if ("video_url" in this.props.Post)
         {

            return ( <Video source={{uri: this.props.Post.video_url}}            
                // repeat={true}
                playInBackground={false}
                playWhenInactive={false}
                repeat={true}
                muted={true}
                resizeMode={"cover"}
                posterResizeMode={"center"}
                style={{
                    aspectRatio: 1,
                    width: "100%",
                    alignContent:'center',
                    marginLeft: 50
                }}
    
                />
     );
            
        }
        else
        {
            return (  <View><Text style={styles.textStyle}> {this.props.Post.text}</Text></View>);

        }
    }

    returnChallengeButton()
    {
        if (this.props.Post.post_type=="challenge")
        {
            //this.props.Post.challenges
            return (<AddButton icon="plus" text={this.props.Post.added_as_challenge.toString()+" Add"} id={this.props.Post._id} AddNum={this.props.Post.added_as_challenge} Added={this.props.Post.user_take_challenge} />);
        }
        
    }

    //Chnge style by post (video or text)
    postStyle = function(options) {
        if (options)
        {return {
            flexDirection:'row',
            alignItems: 'flex-center',
            justifyContent: 'center',
            alignItems: 'center',    
            marginBottom: 10,
            height: 300,
            width:300,
            flex: 1,
        flexWrap: "wrap"
        }
    }
    else
    {
        return {
            flexDirection:'row',
            alignItems: 'flex-center',
            justifyContent: 'center',
            alignItems: 'center',    
            marginBottom: 10,
            height: 100,
            width:200,
            flex: 1,
        flexWrap: "wrap"

        }
    }
       
      }


       render() {
        return (    
 

            <View style={styles.columnStyle}>
                <PostHeader Image={this.props.Post.image_url} UserName={this.props.Post.created} navigation={this.props.navigation} /> 
                <View style={this.postStyle("video_url" in this.props.Post)}>
                 
        {this.getVideo()} 
      
        </View>
                <View style={styles.rowview}>
                    <LikeButton icon="thumbs-up" text={this.props.Post.likes.toString()+" Likes"} type="Like" id={this.props.Post._id} Likes={this.props.Post.likes} Liked={this.props.Post.user_like_post} />
                    <ButtonPost icon="comment" text={this.props.Post.comments.toString()+" Comments"} type="Comment" id={this.props.Post._id} navigation={this.props.navigation} />
                    {this.returnChallengeButton()}
                </View>
                
            </View>
            


);

}


}

//style
const styles ={
    columnStyle:{
        flexDirection:'column',
        justifyContent:'center',
        borderWidth:4,
        borderRadius:10,
        borderColor:"#d1d1e0",
        opacity:3
    },
    tmbStyle:{
        height:50,
        width:50
    },
    tmbcontStyle:{
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        marginRight:10
    },
    rowview:{
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    rowviewCenter:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'        
    },

    viewStyleContent:{
        flexDirection:'row',
        alignItems: 'flex-center',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10
    },
    viewStyle:{
        flexDirection:'row',
        alignItems: 'flex-center',
        justifyContent: 'center',
        alignItems: 'center',    
        marginBottom: 10,
        height: 100,
        width:300,
        flex: 1,
    flexWrap: "wrap"

    },
    viewStyleIcon:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderWidth:0.2
    },
    textStyle:{
        fontSize:17
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0.2,
        bottom: 0,
        right: 0,
        height: 100,
        width:4000,
        aspectRatio: 1,

      },


};
export default Post;