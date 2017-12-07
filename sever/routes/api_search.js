/**
 * Created by Acer on 2017-12-07.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: 'localhost', user: 'root', password: '1q2w3e', database: 'mobile_blog'});

router.use('/', function(req, res, next) {
  var page = req.body.page;
  var pagesize = req.body.pagesize;
  var numbers = (page-1)*pagesize;
  var searchData = req.body.searchData;
  pool.query(`SELECT * FROM article WHERE \`TITLE\` LIKE '%${searchData}%' OR \`AUTHOR\` LIKE '%${searchData}%' OR \`PARTITION\` LIKE '%${searchData}%' ORDER BY ID DESC LIMIT ${numbers},${pagesize}`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'成功',
        result:{
          count:data.length,
          data:data,
        }
      });
    }
  });
});

module.exports = router;
