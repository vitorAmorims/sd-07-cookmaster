const express = require('express');
const multer = require('multer');
// const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const {
  getAllRecipes,
  getRecipesById,
  postRecipe,
  putRecipe,
  deleteRecipe,
  addImgRecipe,
} = require('../controllers/recipes');

const midvalidateToken = require('../middlewares/doneToken');

// const pathFile = path.resolve(__dirname, '..', 'uploads');

// // função responsável por ler o diretório
// async function lerDiretorio() {
//   let arquivos = await fs.readdir(pathFile);
//   return arquivos;
// }

// comentando bloco da fn fileFilter para chegar se arquivo já existe.
// const fileAndExt = path.basename(file.originalname);
  // let nameFile = fileAndExt.split('.')[0];
  // let fileExists = lerDiretorio()
  //   .then((result) => result.includes(nameFile))
  //   .then(result => {
  //     fileExists = result;
  //     return fileExists
  //   });
  // fileExists.then(result => console.log(result))
  // if (fileExists === true) {
  //   console.log('entrou aqui!!');
  //   req.fileExistsError = "goes wrong on the file exists";
  //   return cb(null, false, new Error("goes wrong on the file exists"));
  // }

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (
    file.mimetype !== 'image/jpeg'
    || ext.toLocaleLowerCase() !== '.jpg'
    || ext.toLocaleLowerCase() !== '.jpeg'
  ) {
    req.fileValidationError = 'goes wrong on the mimetype';
    const ERROR = req.fileValidationError;
    return cb(null, false, new Error(ERROR));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()} - ${file.originalname}`;
    cb(null, filename);
  },
});

const multerUploader = multer({ storage, fileFilter });

const upload = multerUploader.single('file');

router.get('/', getAllRecipes);

router.get('/:id', getRecipesById);

router.post('/', midvalidateToken, postRecipe);

router.put('/:id', midvalidateToken, putRecipe);

router.delete('/:id', midvalidateToken, deleteRecipe);

router.put(
  '/:id/image',
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        const { fileValidationError } = req;
        if (String(fileValidationError).includes('goes wrong on the mimetype')) {
          return res.status(403).json({
            error: { message: 'Extension must be `jpg`' },
          });
        }
      }
      // if (req.fileExistsError = "goes wrong on the file exists") {
      //   return res.status(409).json({
      //     "error": { "mesage": "File already exists" }
      //   });
      // }
      next();
    });
  },
  addImgRecipe,
);

module.exports = router;
