const PORT = 8080;

const express = require('express');
const app = express();

app.get('/', (req, res) => {

  	res.send('CSV Parser - Hello World!');
});

app.listen(PORT, () => {
  	console.log('CSV Parser app listening on port ' + PORT);

});


