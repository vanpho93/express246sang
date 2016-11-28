var express = require('express');

var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});

var app = express();
app.listen(3000);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(request, response){
  response.render("trangchu");
});

app.get('/info/:id/:username', function(req, res){
  var i = req.params.id;
  var u = req.params.username;
  res.send(i + u);
});

app.get('/dangnhap', function(req, res){
  res.render("dangnhap");
});

app.get('/chao/:ten', function(req, res){
  var name = req.params.ten;
  res.send('Xin chao ban ' + name);
});

app.get('/tinh/:pt/:a/:b', function(req, res){
  var pt = req.params.pt;
  var a = parseInt(req.params.a);
  var b = parseInt(req.params.b);
  // var kq;
  // switch (pt) {
  //   case 'cong':
  //     kq = a + b;
  //     break;
  //   case 'tru':
  //     kq = a - b;
  //     break;
  //   case 'nhan':
  //     kq = a * b;
  //     break;
  //   case 'chia':
  //     kq = a / b;
  //     break;
  //   default:
  //     kq = "Khong xac dinh"
  // }
  // res.send(`${a} ${pt} ${b} = ${kq}`);
  var phepTinh = new PhepTinh(pt, a, b);
  res.send(phepTinh.getMessage());
});

app.post('/xulydangnhap', parser, function(req, res){
  var name = req.body.ten;
  var age = req.body.tuoi;
  res.send(name + age);
});

function PhepTinh(pt, a, b){
  this.phepTinh = pt;
  this.soA = a;
  this.soB = b;
  var that = this;
  function getResult(){
    //Tinh ket qua
    var kq;
    switch (that.phepTinh) {
      case 'cong':
        kq = that.soA + that.soB;
        break;
      case 'tru':
        kq = that.soA - that.soB;
        break;
      case 'nhan':
        kq = that.soA * that.soB;
        break;
      case 'chia':
        kq = that.soA / that.soB;
        break;
      default:
        kq = "Khong xac dinh"
    }
    return kq;
  }
  this.getMessage = function(){
    //Tra ve chuoi
    return `${this.soA} ${this.phepTinh} ${this.soB} = ${getResult()}`
  }
}
