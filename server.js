var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('HTTP 路径为\n' + path)
  if(path == '/'){
    var string=fs.readFileSync('./index.html','utf8')
    var amount=fs.readFileSync('./db.txt','utf8')
    string=string.replace('&&&amount&&&',amount)
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  }else if(path =='/style.css'){
    var string=fs.readFileSync('./style.css','utf8')
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write(string)
    response.end()
  }else if(path == '/script.js'){
    var string=fs.readFileSync('./script.js','utf8')
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write(string)
    response.end()
  }else if(path=='/pay'){                                //&&method.toUpperCase()=='POST'
    var amount=fs.readFileSync('./db.txt','utf8')
    var newAmount=amount-1
    if(Math.random()>0.5){
      fs.writeFileSync('./db.txt',newAmount)
      response.setHeader('Content-Type', 'application/javascript') //image/jpg
      response.statusCode = 200
      response.write(`
      $(query.callbackName).call(undefined,{
         "success":ture,
         "left":$(newAmount)
      }) `// amount.innerText=amount.innerText-1
      )              //fs.readFileSync('./tim.jpg')   alert("我是pay")
    }else{
      response.statusCode = 400
      response.write('失败') 
    }
      response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('找不到对应的路径，你需要自行修改index.js')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)