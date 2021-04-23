const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('./imagem.jpeg');

const form = new FormData();

form.append('image', stream);

const formHeaders = form.getHeaders();

axios.put('http://localhost:3000/recipes/6082d402715c5a021ed23519/image', form, {
    headers: {
        ...formHeaders,
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODJkMzFlYzdkOWExMDEyMGQzMTk5YyIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjE5MTg2NjEyLCJleHAiOjE2MTkxOTAyMTJ9.B6Qwoni4ryHdGLMDTJ6-IQ08YkOu-z_SFmKe5YCA22Y'
    }
})
  .then((response) => console.log(response))
  .catch((error) => console.log(error));