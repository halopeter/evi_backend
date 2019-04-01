'use strict';
const axios = require('axios');

module.exports.main = async (event) => {
  const { code } = event.queryStringParameters;
  let accessToken = null
  await axios({
    method: 'post',
    url: `https://login.eveonline.com/oauth/token?grant_type=authorization_code&code=${code}`,
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    },
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    accessToken = response.data.access_token;
  });
  return {
    statusCode: 301,
    body: JSON.stringify({"result":"ok"}),
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Location": `https://dgwxfhbva6lnp.cloudfront.net/?access_token=${accessToken}`,
    },
  };
};
