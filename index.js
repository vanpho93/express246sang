var express = require('express');
var app = express();
app.listen(3000);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(request, response){
  response.render("trangchu");
});

app.get('/info/:id', function(req, res){
  var i = req.params.id;
  res.send(i);
});
