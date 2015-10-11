'use strict';


var neo4j = require('node-neo4j');
var db = new neo4j('http://neo4j:bitcoin@localhost:7474');

function isEven(n) {
    return parseFloat(n) && (n % 2 == 0);
}

db.cypherQuery('MATCH (data) DELETE data RETURN count(data)', function(err, result) {
    if (err) {
        console.log('error:' + err);
        throw err;
    } else {
        console.log(result);
    }
})



for (var i = 0; i < 10; i++) {
    db.insertNode({
        name: "node " + i,
        leftChild: '',
        rightChild: '',
        sequence: i
    }, function(err, node) {
        if (err) {
            console.log('error:' + err);
        } else {
            var x = node.sequence + node._id;
            console.log(node + ' id#' + x);

            console.log("even? " + isEven(x));

            var parentId = 0;
            if (isEven(x)) {
                parentId = (node.sequence/ 2) + node._id;

                // update for left child var
                db.updateNode(parentId, {
                    leftChild: node.sequence
                }, function(err, node) {
                    if (err) {
                        console.log('error:' + err)
                    }

                    if (node === true) {
                        console.log('updated node');
                    } else {
                        console.log('node not found');
                    }
                });
            } else {
                parentId = ((node.sequence -1)/ 2) + node._id;

                // update for right child var
                // update our parent for binary tree
                db.updateNode(parentId, {
                    rightChild: node.sequence
                }, function(err, node) {
                    if (err) {
                        console.log('error:' + err)
                    }

                    if (node === true) {
                        console.log('updated node');
                    } else {
                        console.log('node not found');
                    }
                });
            }
        }
    });


    /* db.updateNode(i, {
        leftChild: ' updated my left child'
    }, function(err, node) {
        if (err) {
            console.log('error:' + err)
        }

        if (node === true) {
            console.log('updated node');
        } else {
            console.log('node not found');
        }
    }); */
}
