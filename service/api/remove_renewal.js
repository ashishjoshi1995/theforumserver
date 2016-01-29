// JavaScript Document
//hi gaurav test 1
exports.post = function(request, response) {
     var tables = request.service.tables;
     var topic = tables.getTable('topic');
     var gaurav;
      var postValues = request.body;

    if (postValues.members != null)
        postValues = postValues.members;

    var item = {
        topic_id : postValues.topic_id,
        uid : postValues.uid       
    }
    
    topic.where({
       topic_id : item.topic_id 
    }).read({
        success : function(results){
            results[0].renewal_requests--;
            //results[0].notif_new_renewal_request = results[0].notif_new_renewal_request+1;
            gaurav = results[0].renewal_requests;
			if(results[0].renewal_request_ids!=null){
            var p=results[0].renewal_request_ids.indexOf(item.id);
						var q=item.length;
						var r=results[0].renewal_request_ids.length;
						if((p+q+1)==r)
						{
							results[0].renewal_request_ids=results[0].renewal_request_ids.remove(item.uid,"");
							}
							else{
						results[0].renewal_request_ids=results[0].renewal_request_ids.remove(item.uid+" ","");
							}
							 results[0].points= results[0].points-3;
           					 topic.update(results[0]);
				}
          
           // response.send(statusCodes.OK, { message : results[0].renewal_request});
        }
    });

    response.send(statusCodes.OK, { message : gaurav});
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};