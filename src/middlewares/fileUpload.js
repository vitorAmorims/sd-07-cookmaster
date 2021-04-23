const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(req.params.id);
  }
});

const isEndWithJpeg = (filename) => filename.endsWith('.jpeg');

const isFileExist = (filename) => fs
  .readdirSync('./uploads')
  .some(file => file.endsWith(filename));

const loadFiles = () => fs.readdirSync('../uploads');

const fileFilter = (req, file, cb) => {
  const fileName = file.originalname;
  if (isEndWithJpeg(fileName)) {
    if (isFileExist(fileName)) {
      req.fileValidationError = "File already exists"
      cb(null, false, req);
    } else {
      cb(null, true);
    }

  } else {
    req.fileValidationError = "Extension must be `png`"
    cb(null, false, req);
  }

};

const upload = multer({ storage, fileFilter });


app.post('/upload', upload.single('file'), (req, res) => {

  const { fileValidationError } = req;
  if (fileValidationError) {
    return res.status(500).json({
      error: { message: fileValidationError }
    });

  }
  return res.json({ message: "upload com sucesso" });
})

// Bonus 1
app.post('/multiple', upload.array('file'), (req, res) => {
  const { fileValidationError } = req;
  if (fileValidationError) {
    return res.status(500).json({
      error: { message: fileValidationError }
    });

  }
  const files = loadFiles()
  const path = req.get('host');
  const mapFiles = files.map(file => ({
    file,
    url: path + "/" +file
  }))
  return res.json(mapFiles);
});

// Bonus 2
const simpleUpload = multer({dest: 'profilePic'});

const readProfiles = JSON.parse(fs.readFileSync('profiles.json'));
const saveProfile = (profiles, newUser) => fs.writeFileSync(
  'profiles.json',
  JSON.stringify([...profiles, newUser])
)

app.post('/profile', simpleUpload.single('file'), (req, res) => {
  const newUser = { [req.file.filename]: {...req.body} };
  const profiles = readProfiles;
  saveProfile(profiles, newUser);
  res.status(200).json({message: "perfil salvo com sucesso"});

})

