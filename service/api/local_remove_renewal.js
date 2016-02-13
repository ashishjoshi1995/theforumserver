// JavaScript Document
//hi gaurav test 1
exports.post = function(request, response) {
     var tables = request.service.tables;
     var topic = tables.getTable('areatopics');
     var gaurav;
      var postValues = request.body;
		var user = tables.getTable('user');
    if (postValues.members != null)
        postValues = postValues.members;

    var item = {
        topic_id : postValues.topic_id,
        uid : postValues.uid       
    }
	user.where({
        uid: item.uid
    }).read({
            success: function(data1) {
                if(data1[0].renewal_request_croaked!=null){
					data1[0].renewal_request_croaked--;}
					else{data1[0].renewal_request_croaked=0;}
					
					user.update(data1[0]);

            }
        });
    
    topic.where({
       topic_id : item.topic_id 
    }).read({
        success : function(results){
            results[0].renewal_requests--;
            //results[0].notif_new_renewal_request = results[0].notif_new_renewal_request+1;
            gaurav = results[0].renewal_requests;
			if(results[0].renewal_request_ids!=null){
            			var p=results[0].renewal_request_ids.indexOf(item.uid);
						var q=item.uid.length;
						var r=results[0].renewal_request_ids.length;
						if((p+q)==r)
						{
							results[0].renewal_request_ids=results[0].renewal_request_ids.replace(item.uid+"","");
							}
							else{
						results[0].renewal_request_ids=results[0].renewal_request_ids.replace(item.uid+" ","");
							}
							 results[0].points= results[0].points-3;
           					 topic.update(results[0]);
							 renewalReceivedUpdate(results[0].uid);
				}
          
           // response.send(statusCodes.OK, { message : results[0].renewal_request});
        }
    });
	function renewalReceivedUpdate(uid1){
	user.where({
        uid: uid1
    }).read({
            success: function(data1) {
                if(data1[0].renewal_request_received!=null){
					data1[0].renewal_request_received--;}
					else{data1[0].renewal_request_received=0;}
					
					user.update(data1[0]);

            }
        });
}

    response.send(statusCodes.OK, { message : gaurav});
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};