var db = require('/QOpenSys/QIBM/ProdData/Node/os400/db2i/lib/db2.js');
var fs = require('fs'); 
var url = require('url'); 
var http = require('http');
exports.process = function(req, response) 
        {   db.init();   
            db.conn('XXXX','XXXX','XXXXX'); // Connection to Another I series BOX.   
            var sqlstr ="SELECT SDPHNO, SDEENO, SDEEDS, case when SDPDFG = 2 then 'COMPLETE'   when SDPDFG = 9 then 'CRASHED'   when SDPDFG = 1 then 'ACTIVE'  when SDPDFG = 0 then 'WAITING' end  as STATUS  FROM QGPL.FILE1 FETCH FIRST 200 ROWS ONLY"    
            db.exec( sqlstr,   function(jsonObj) 
                    { response.writeHead(200, {'Content-Type': 'application/json'});  
                     response.end(JSON.stringify(jsonObj));     });   
        }
