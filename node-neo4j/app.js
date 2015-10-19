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
        console.log('result=' + result);
    }
})


for (var i = 0; i < 24; i++) {
    go(i, function() {
        console.log('worked?');
    });
}


function go(loop, callback) {
    db.insertNode({
        name: "node " + loop,
        leftChild: '',
        rightChild: '',
        sequence: loop
    }, function(err, node) {
        if (err) {
            console.log('error:' + err);
        } else {
            console.log('loop is ' + loop);
            loop++;

            // skip root node
            if (node._id > 0) {
                console.log(node + ' id#' + node._id);
                var parentId = 0;
                var relId = "Left Child";

                var index = node._id + 1;
                if (isEven(index)) {
                    console.log(' i am even');
                    parentId = ((node._id + 1) / 2) - 1;
                    relId = "Left Child";
                } else {
                    console.log(' i am odd');
                    parentId = ((node._id) / 2) - 1;
                    relId = 'Right Child';
                }

                console.log("node=" + node._id);
                console.log('parent= ' + parentId);
                db.insertRelationship(node._id, parentId, relId, {
                    child: 'or parent'
                }, function(err, relationship) {
                    if (err) {
                        console.log('error:' + err);
                        throw err;
                    }

                    // Output relationship properties.
                    console.log(relationship.data);
                    callback();
                });

                var p = node._id - 1;
                db.insertRelationship(p, node._id, "Sequence", {
                    child: 'or parent'
                }, function(err, relationship) {
                    if (err) {
                        console.log('error:' + err);
                        throw err;
                    }

                    // Output relationship properties.
                    console.log(relationship.data);
                    callback();
                });
            }
        }
    });
}
