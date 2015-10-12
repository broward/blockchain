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

            // skip root node
            if (node._id > 0) {
                console.log(node + ' id#' + node._id);
                var parentId = 0;

                var index = node._id + 1;
                if (isEven(index)) {
                    console.log(' i am even');
                    parentId = (node._id + 1) / 2;
                } else {
                    console.log(' i am odd');
                    parentId = (node._id) / 2;
                }

                console.log("node=" + node._id);
                console.log('parent= ' + parentId);
                db.insertRelationship(node._id, parentId, 'RELATIONSHIP_TYPE', {
                    child: 'or parent'
                }, function(err, relationship) {
                    if (err) {
                        console.log('error:' + err);
                        throw err;
                    }

                    // Output relationship properties.
                    console.log(relationship.data);
                });
            }
        }
    });
}

