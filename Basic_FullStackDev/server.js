require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;

// app listening on port
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});