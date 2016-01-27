exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;
    var responseJson = [];
    
    var postValues = request.body;
    if (postValues.members != null)
        postValues = postValues.members;
    var item = {
        uid: postValues.uid
    };
    
    var tables = request.service.tables;
    var topicNotification = tables.getTable('TopicNotification');
    var opinionNotification = tables.getTable('OpinionNotification');
    var notifRec = false;
    var notifRec2 = false;
    topicNotification.where({
    uid : item.uid
    }).read({
        success:function(results){
            for(var j =0; j<results.length;j++){
                responseJson.push(results[j]);
            }
            if(notifRec == true){
                  response.send(statusCodes.OK, { message : JSON.stringify(responseJson) });              
            }
            notifRec = true;
        }
    });
    opinionNotification.where({
    uid : item.uid
    }).read({
        success:function(results){
            for(var j =0; j<results.length;j++){
                responseJson.push(results[j]);
            }
            if(notifRec == true){
                  response.send(statusCodes.OK, { message : JSON.stringify(responseJson) });              
            }
            notifRec = true;
        }
    });
    
    
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};