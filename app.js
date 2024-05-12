const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller');
const pathResolver = require('./pathResolver');
const generator = require('./generation');

const app = express(); 
const PORT = 3000; 

app.use(bodyParser.text({ type: 'text/html' }));
app.use(cors());

app.get('/hello', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.status(200).send("<h1>Hello GFG Learner!</h1>"); 
}); 

app.post('/convert', controller.createPDF);

app.get('/path-resolver', pathResolver.createPDF);

app.get('/generate', generator.createPDF);


app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
