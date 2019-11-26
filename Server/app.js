const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//divide routers for each model
const user_personal_details_router=require('./Routers/user/user_personal_details_router')
const challenge_details_router = require('./Routers/challenges/challenge_general_details_router')
const saved_challenge_router = require('./Routers/challenges/saved_challenge_router')
const user_achivements_router=require('./Routers/user/user_achivements_router')
const user_posts_router=require('./Routers/post/posts_router')
const profile_router=require('./Routers/profile/profile_router')
const feed_router=require('./Routers/feed/feed_router')
require('./DB/mongoose')


//automatic parse incoming json to object
app.use(express.json())


//add routers to server
app.use(user_personal_details_router)
app.use(challenge_details_router.router)
app.use(saved_challenge_router.router)
app.use(user_achivements_router.router)
app.use(user_posts_router.router)
app.use(profile_router)
app.use(feed_router)


app.get('/', (req, res) => {
    console.log("ddd");
    res.send("hello");
})


app.listen(port, () => {
    console.log("connect to serrver" + port)
})
