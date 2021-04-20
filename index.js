/const express = require('express');
const multer = require('multer')

const app = express();
const path = require('path');
const PORT = 3000;
app.use('/images', express.static(path.join(__dirname, 'uploads')));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
 //daqui pra baixo sei lá
app.use(express.static(_dirname + 'uploads/'))
const upload = multer({dest: 'uploads/'})

app.post('/files/upload',upload.single('file'),  (req, res) => {
  res.status(200).json({message: "arquivo enviado com sucesso"})
})
 //daqui pra baixo fica
app.listen(PORT, () => { console.log('API rodando na porta 3000'); });