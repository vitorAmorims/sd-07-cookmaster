const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('./imagem.jpeg');

const form = new FormData();

form.append('image', stream);

const formHeaders = form.getHeaders();

axios
  .put('http://localhost:3000/recipes/6082f505a1c53b2bbf8b0206/image', form, {
    headers: {
      ...formHeaders,
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODJmM2I5ODdlYTQ1MjljNm'
        + 'FhZjRhYSIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2Vy'
        + 'IiwiaWF0IjoxNjE5MTk1MDE3LCJleHAiOjE2MTkxOTg2MTd9.3wci4JL-U2d230I_Keyoh-'
        + 'JkKoL-102THBHJG4slMHY',
    },
  })
  .then((response) => console.log(response))
  .catch((error) => console.log(error));