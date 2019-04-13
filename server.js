/**
 * SERVER FILE --- server / PORT information
 */
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));

