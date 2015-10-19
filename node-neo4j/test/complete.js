var should = require('chai').should();
var expect = require('chai').expect();
var assert = require('assert');
var app = require('../app.js');
var db2Lib = require('../lib/db2.js');
var p = require('../package.json');
var sqlParser = require('simple-sql-parser');
console.off();



describe("Quartz WCS Data Importer Test Suite", function() {
    // set higher timeout to give SQL server connection time to complete
    this.timeout(25000);


    // Test for existence of the project and important variables
    describe("Existence Suite", function() {
        it("test if program and package exists", function() {
            should.exist(app);
            should.exist(p);
            should.exist(db2Lib);
        });
    });


    // Test db2 functions
    describe("Db2 Functions", function() {
        it("test sku query", function() {
            var db2 = new db2Lib(null);
            console.log(sqlParser.sql2ast(db2.skuQuery()));
        });

        it("test class query", function() {

        });
    });

    // Shut down the app
    after(function() {
        console.off();
        //var result = app._shutdown();
    })

});
