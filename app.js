const express = require('express');
const app = express();
const demoRoute = require('./routes/demo');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', demoRoute);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Connected at port ${PORT}`);
});
