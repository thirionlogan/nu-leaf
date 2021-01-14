require('dotenv').config();
const app = require('./app/app');

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`app listening at port ${port}`));
