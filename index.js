var express = require('express');

var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});

var app = express();
app.use(express.static('public'));
app.listen(3000);

function Person(name, age, address){
  this.name = name;
  this.age = age;
  this.address = address;
}

var arr = [
  new Person('A', 18, '90 LTR'),
  new Person('B', 20, '30 CMT8'),
  new Person('A', 18, '90 LTR'),
  new Person('B', 20, '30 CMT8')
];

function Phim(tenPhim, idPhim){
  this.ten = tenPhim;
  this.id = idPhim;
}

var phim1 = new Phim("React & Redux With ExpressJS", "iQ6BDyx7D4g");
var phim2 = new Phim("Creating Forms with React and Redux", "q6NXa14o1f0");
var phim3 = new Phim("Abstracting Form State with Redux Form", "eDTi7lYR1VU");
var mangPhim = [phim1, phim2, phim3];

app.get('/youtube', function(req, res){
  res.render("youtube", {arrPhim: mangPhim});
});

app.get('/show', function(req, res){
  res.render("show", {mang: arr});
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/home', function(req, res){
  res.render('home', {tuoi: 15});
});

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
  res.render("welcome", {ten: name, tuoi: age});
});

app.post('/xulytinhtoan', parser, function(req, res){
  var pt = req.body.pt;
  var a = parseInt(req.body.a);
  var b = parseInt(req.body.b);
  var phepTinh = new PhepTinh(pt, a, b);
  res.send(phepTinh.getMessage());
});

app.get('/tinhtoan', function(req, res){
  res.render('tinhtoan');
})

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
