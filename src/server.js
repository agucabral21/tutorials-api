const dotenv = require('dotenv');
dotenv.config();

const { app } = require('./config');

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API listening on port ${port}!`));
