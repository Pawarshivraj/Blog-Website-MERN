const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notfound, errorHandler } = require('./middleware/errorMiddleware');
const upload = require('express-fileupload');

const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors({ credentials: true, origin: "https://blog-website-mern-lovat.vercel.app/" }));
app.use(cors());
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error Handling Middleware
app.use(notfound);
app.use(errorHandler);

// Connect to MongoDB and start server
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
