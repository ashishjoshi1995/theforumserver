exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;
    
    var tables = request.service.tables;
    var topic = tables.getTable('topic');
    var opinion = tables.getTable('opinion');
    var postValues = request.body;
    
    if (postValues.members != null)
        postValues = postValues.members;

    var item = {
        uid : postValues.uid       
    }
    
    topic.where({
       uid : item.uid 
    }).read({
        success : function(results){
            for(var j=0;j <results.length;j++){
                results[j].notif_count = 0;
                results[j].notif_new_opinions = 0;
                results[j].notif_new_renewal_request = 0;
                topic.update(results[j]);
            }
        }
    });
    
    opinion.where({
        uid:item.uid
    }).read({
        success : function(result){
            for(var k=0; k<result.length;k++){
                result[k].notif_count = 0;
                result[k].notif_downvotes =0;
                result[k].notif_upvotes =0;
                opinion.update(result[k]);
            }
        }
    });
   
    response.send(statusCodes.OK, { message : 'fasghj' });
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};