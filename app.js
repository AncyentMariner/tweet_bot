require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Twit = require('twit');
const express = require('express');
const app = express();
var Client = require('node-rest-client').Client;
var client = new Client();

const port = (process.env.PORT || 3000);
const secret = {
  consumer_key: process.env.CUSTOMER_KEY,
  consumer_secret: process.env.CUSTOMER_SECRET,
  access_token: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const T = new Twit(secret);

app.get('/', (req, res) => {
  res.send('hi there');
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendTweet() {
  client.get('https://api.chucknorris.io/jokes/random', (data, status) => {
    var sentence = data.value.split(' ');
    let index = getRandomIntInclusive(0, sentence.length);
    let twitterStatus = `you are a treasonous ${sentence[index]}`;

    // T.post('statuses/update', {status: twitterStatus}, (error, tweet, respsonse) => {
    //   if (error) console.log(error);
    //   console.log('tweeted :)', tweet);
    // });
  });
}


function tweet() {
  client.get('https://api.chucknorris.io/jokes/random', (data, status) => {
    var sentence = data.value.split(' ');
    let index = getRandomIntInclusive(0, sentence.length);
    let twitterStatus = `you are a treasonous ${sentence[index]}`;

    var image_path = './image.png';
    var b64content = fs.readFileSync(image_path, { encoding: 'base64' });

    T.post('media/upload', { media_data: b64content }, (err, data, response) => {
      if (err) console.log(err);

      console.log(data);

      T.post('statuses/update', {status: twitterStatus, media_ids: data.media_id_string}, (error, tweet, respsonse) => {
        if (error) console.log(error);

        console.log('tweeted :)', tweet);
      });
    });
  });
}


tweet();

// setInterval(() => {
//   try {
//     sendTweet();
//   } catch(e) {
//     console.log(e);
//   }
// }, 120000);
