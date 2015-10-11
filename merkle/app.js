'use strict';


var merkle = require('merkle');
var abcde = ['tx0', 'tx1', 'tx1', 'tx2', 'tx3', 'tx4', "tx4", "tx5", "tx7", "tx7"];


var tree = merkle('sha1').sync(abcde);

console.log("tree root" + tree.root());

for (var i = 0; i < tree.depth(); i++) {
	console.log("level:" + i);
	console.log("\t items:");
	for (var j = 0; j < tree.level(i).length; j++) {
		console.log("\t\t" + tree.level(i)[j]);
	}
}
