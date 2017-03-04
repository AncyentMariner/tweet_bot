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

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

client.get('http://randomword.setgetgo.com/get.php', (data) => {
  console.log(decoder.write(data));
});


function sendTweet() {
  client.get('https://api.chucknorris.io/jokes/random', (data, status) => {
    let sentence = data.value.split(' ');
    let index = getRandomIntInclusive(0, sentence.length);
    let twitterStatus = `.@realDonaldTrump you are a treasonous ${sentence[index]}`;

    let image_path = './image.png';
    let b64content = fs.readFileSync(image_path, { encoding: 'base64' });

    T.post('media/upload', { media_data: b64content }, (err, data, response) => {
      if (err) console.log(err);
      // console.log(data);

      T.post('statuses/update', {status: twitterStatus, media_ids: data.media_id_string}, (err, tweet, respsonse) => {
        if (err) console.log(err);

        console.log('tweeted :)');
      });
    });
  });
}

sendTweet();

function sendTweetsContinusouly() {
  let timePeriod = getRandomIntInclusive(240000, 900000);

  setInterval(() => {
    try {
      sendTweet();
    } catch(e) {
      console.log(e);
    }
  }, timePeriod);
}

sendTweetsContinusouly();
