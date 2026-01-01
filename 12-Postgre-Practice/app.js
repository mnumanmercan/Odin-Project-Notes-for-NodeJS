const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');
const indexRouter = require('./routes/indexRouter.js');
const newRouter = require('./routes/newRouter.js');
const searchRouter = require('./routes/searchRouter.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sample API endpoint
app.use('/', indexRouter);
app.use('/', newRouter);
app.use('/users', searchRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});