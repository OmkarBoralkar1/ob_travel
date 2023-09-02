const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const signupModel = require('./models/signup.js');
const createmodel = require('./models/create.js');
const path = require('path');
const { error } = require('console');
const app = express();
app.use(express.json());
app.use(cors());
app.use('../uploads', express.static(path.join(__dirname , '/uploads')));
const PORT = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/'); // This path might be problematic
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});



// Middleware to authenticate and populate req.user
// app.use(expressJwt({ secret: jwtSecret, algorithms: ['HS256'] }));

const upload = multer({ storage: storage });

app.post('/register', upload.single('file'), async (req, res) => {
  const { name, email, password, contactNumber } = req.body;
  const file = req.file;

  try {
    const newUser = new signupModel({
      name,
      email,
      password,
      contactNumber,
      fileUrl: file.filename, // Use 'file.filename' or the relative path of the file
    });

    await newUser.save();
    res.status(201).send('User registered successfully.');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving user.');
  }
});
// app.get('/file', async (req, res) => {
//   const { email } = req.query;

//   try {
//     const user = await signupModel.findOne({ email });
//     if (user) {
//       res.status(200).json({ imageUrl: user.fileUrl });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching profile image:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await signupModel.findOne({ email, password });

    if (user) {
      const profileImageUrl = user.fileUrl; // Make sure the field name matches your schema
      console.log("the profile imagre url in the login api is", profileImageUrl)
      res.status(200).json({ message: 'Authentication successful', profileImageUrl });
    } else {
      // No user found with provided credentials
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const uploads = multer({ dest: 'uploads/' });

const File = mongoose.model('File', {
  name: String,
  path: String,
});

app.post('/create', uploads.fields([{ name: 'imgFile' }, { name: 'pdfFile' }]), async (req, res) => {
  const { loggedInUserEmail } = req.body;
  console.log('loggedInUserEmail:', loggedInUserEmail);
  const {
    Name,
    Continent,
    State,
    City,
    Country,
    title,
    sub_title,
    Description,
  } = req.body;
  const imageFiles = req.files['imgFile'];
  const pdfFiles = req.files['pdfFile'];

  try {
    const newImageFile = new File({ name: imageFiles[0].originalname, path: imageFiles[0].path.replace('uploads/', '') });
    const newPdfFile = new File({ name: pdfFiles[0].originalname, path: pdfFiles[0].path.replace('uploads/', '') });

    await newImageFile.save();
    await newPdfFile.save();

    // Fetch logged-in user details from signupModel based on their email
    // const loggedInUserEmail = 'user@example.com'; // Replace with actual logged-in user's email
    const loggedInUser = await signupModel.findOne({ email: loggedInUserEmail });

    if (!loggedInUser) {
      return res.status(410).send('Logged-in user not found.');
    }

    const newUser = new createmodel({
      Name,
      Continent,
      State,
      City,
      Country,
      title,
      sub_title,
      Description,
      img_fileUrl: newImageFile.name, // Store the image file by name
      pdf_fileUrl: newPdfFile.name,   // Store the PDF file by name
      user: {
        name: loggedInUser.name,
        email: loggedInUser.email,
        file: loggedInUser.fileUrl.filename,
      },
    });

    await newUser.save();
    res.status(201).send('Blog created successfully.');
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).send('Error creating blog.');
  }
});
app.get('/popularblogs', async (req, res) => {
  createmodel.find()
  .then(users => res.json(users))
  .catch(err =>res.json(err))
 
});

app.post('/userblogs', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await signupModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch blogs from the create model for the logged-in user
    const userBlogs = await createmodel.find({ 'user.email': email });

    res.status(200).json(userBlogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});