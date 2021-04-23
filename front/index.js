const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('./imagem.jpeg');

const form = new FormData();

form.append('image', stream);

const formHeaders = form.getHeaders();

axios.put('http://localhost:3000/recipes/6082e94f4a15bc17099fb127/image', form, {
    headers: {
        ...formHeaders,
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODJlOGJiNTdhMDEzMTVlOWNlMTZmMiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjE5MTkyMDQzLCJleHAiOjE2MTkxOTU2NDN9.ZK49UPN-wpyXqE6Y7Vyw0_sXj8K2h8hNQZ9tH5eTvDY'
    }
})
  .then((response) => console.log(response))
  .catch((error) => console.log(error));