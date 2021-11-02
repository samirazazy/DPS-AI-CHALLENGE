const axios = require('axios')
const hotpTotpGenerator = require('hotp-totp-generator')

const URL = 'https://dps-challenge.netlify.app/.netlify/functions/api/challenge';

const jsonBody = {
  github: 'https://github.com/samirazazy/DPS-AI-CHALLENGE',
  email: 'samierazazy@gmail.com',
  url: 'https://dps-ai.herokuapp.com/api/predict',
  notes:
    'I have created a simple web app for the model. You can try it through this link: https://dps-ai.herokuapp.com/'
};

const password = hotpTotpGenerator.totp({
  // Key ==> name@example.comDPSCHALLENGE
  key: 'samierazazy@gmail.comDPSCHALLENGE',
  // Time Step X ==> 120 seconds
  X: 120,
  // T0 ==> 0
  T0: 0,
  // algorithm => HMAC-SHA-512
  algorithm: 'sha512',
  // password =>  10-digit
  digits: 10
});

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${password}`
};

axios
  .post(URL, jsonBody, { headers })
  .then((response) => console.log('Response', response))
  .catch((error) => console.log('Error', error));
