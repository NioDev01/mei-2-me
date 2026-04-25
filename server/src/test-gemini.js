const axios = require('axios');

async function listModels() {
  const apiKey = "AIzaSyAxcpIOGhP0JlTSr1JkfXw7aHY1eCN3D_4";

  const res = await axios.get(
    'https://generativelanguage.googleapis.com/v1beta/models',
    {
      headers: {
        'X-goog-api-key': apiKey,
      },
    }
  );

  console.log(JSON.stringify(res.data, null, 2));
}

listModels();