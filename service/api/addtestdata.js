exports.post = function(request, response) {
   var tables = request.service.tables;
     var topic = tables.getTable('topic');
     
      var postValues = request.body;

    if (postValues.members != null)
        postValues = postValues.members;

    var item = {
        topic_id : 12345,
        description:"May be his wife",
        topic : "#aamiroutofIncredibleIndia"
               
    }

topic.insert(item);
    response.send(statusCodes.OK, { message : 'Hello World!' });
};

exports.get = function(request, response) {
     var tables = request.service.tables;
     var topic = tables.getTable('topic');
    var item = {
        topic_id : 12345,
        description:"May be his wife",
        topic : "#aamiroutofIncredibleIndia"
               
    }

topic.insert(item);
    response.send(statusCodes.OK, { message : 'Hello World!' });
    }