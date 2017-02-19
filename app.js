require('dotenv').config();
const Twit = require('twit');
const express = require('express');
const port = (process.env.PORT || 3000);

const secret = {
  consumer_key: process.env.CUSTOMER_KEY,
  consumer_secret: process.env.CUSTOMER_SECRET,
  access_token: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const T = new Twit(secret);
const app = express();

app.get('/', (req, res) => {
  res.send('hi there');
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

//build out changing status variable
let status = '';

function sendTweet() {
  T.post('statuses/update', {status: 'thing3'}, (error, tweet, respsonse) => {
    if (error) console.log(error);

    console.log(tweet);
  });
}

setInterval(() => {
  try {
    sendTweet();
  } catch(e) {
    console.log(e);
  }
}, 120000);
