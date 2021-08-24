const axios = require("axios");
const http = require("http");
const fs = require("fs")
function importarJsons() {
  axios
    .get(
      "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
    )
    .then((Response) => {
      let content = '>'
      let archivo = ''
      Response.data.forEach(element => {
          content+= `<tr>
          <th scope="row">${element.idproveedor}</th>
          <td>${element.nombrecompania}</td>
          <td>${element.nombrecontacto}</td>
        </tr>`
      });
      content+='</'
      archivo = fs.readFileSync('proveedores.html', 'utf-8')
      const arr = archivo.split('tbody')
      arr[1]=content
      fs.writeFile('proveedores.html', arr.join('tbody'), (err)=>{console.error(err)})


    });

  axios
    .get(
      "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
    )
    .then((Response) => {
        let content = '>'
        let archivo = ''
        Response.data.forEach(element => {
            content+= `<tr>
            <th scope="row">${element.idCliente}</th>
            <td>${element.NombreCompania}</td>
            <td>${element.NombreContacto}</td>
          </tr>`
        });
        content+='</'
        archivo = fs.readFileSync('clientes.html', 'utf-8')
        const arr = archivo.split('tbody')
        arr[1]=content
        fs.writeFile('clientes.html', arr.join('tbody'), (err)=>{console.error(err)})
  
  
      });
}
importarJsons();

const server = http.createServer((req, res) => {
    if (req.url == '/api/proveedores'){
        fs.readFile('proveedores.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    }
    else if(req.url == '/api/clientes'){
        fs.readFile('clientes.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end()
    }
}).listen(8081);

