require('dotenv').config();
const { app, express } = require('./app');
const routes = require('./src/routes/routes');

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
