

exports.post = function(request, response) {
     var postValues = request.body;
		 if (postValues.members != null)
        postValues = postValues.members;
		
		var item = {
        
        longitude : postValues.longitude,
		latitude : postValues.latitude      
    }
    var data = [];
    //var data1 = [];
    //var data3;
    var tids = [];

    var tables = request.service.tables;
    var opinion = tables.getTable('areaopinions');
    var topic = tables.getTable('areatopics');
    opinion.orderByDescending("upvotes").read({
        success: function(results) {
			if(results.length>0){
			
            var a = 20;
            var string = results[0].topic_id;
            for (var j = 0; j < results.length; j++) {
				if(results[j].longitude!=null && results[j].latitude!=null){
							var dis=distance(results[j].latitude,results[j].longitude,item.latitude,item.longitude);
							if(dis>=1){
								continue;
							}
							
						}
						else{continue;}
                var h = false;
                if (j != 0) {
                    var string1 = string.split(" ");

                    for (var l = 0; l < string1.length; l++) {
                        if (string1[l] == results[j].topic_id) {

                            h = true;
                            break;
                        }
                    }
                    if (a == 0) break;
                    if (h == true) continue;
                    a--;
                    string = string + " " + results[j].topic_id;
                }
                tids.push(results[j].topic_id);
                data.push({
                    "serverId": results[j].id,
					"uid"	:results[j].uid,
                    "topic_id": results[j].topic_id,
                    "opinionText": results[j].opinion,
                    "downvotes": results[j].downvotes.toString(),
                    "upvotes": results[j].upvotes.toString(),
                    "topic_name": results[j].topic,
                    "trends_id": results[j].opinion_id,
                    "downvote_ids": results[j].downvote_ids,
                    "upvote_ids": results[j].upvote_ids,
					"longitude":results[j].longitude.toString(),
					"latitude":results[j].latitude.toString(),
                    "hours_left": "0",
                    "renewal": "0",
                    "description": "x",
                    "renewalIds": "k"
                });



            }
            var data2 = JSON.stringify(data);
            var d = JSON.stringify(tids);
            Login(data2, d, data.length - 1);
			}
			else{
				response.send(statusCodes.OK, {
                            message: "null"
                        });
			}

        }
    });

    function Login(jsonString, topics, i) {
        var data1 = JSON.parse(jsonString);
        var da = JSON.parse(topics);

        var da2;

        topic.where({
            topic_id: da[i]
        }).read({
                success: function(results1) {
					if(results1.length>0)
					{
                    data1[i].hours_left = results1[0].hours_left.toString();
                    data1[i].renewal = results1[0].renewed_count.toString();
                    data1[i].description = results1[0].description.toString();
                    if(results1[0].renewal_request_ids!=null){
                    data1[i].renewalIds = results1[0].renewal_request_ids.toString();
                    }
					}
					if (i == 0) {
						da2 = JSON.stringify(data1);
						
                        response.send(statusCodes.OK, {
                            message: da2
                        });
                    }
                    else {
                        i = i - 1;
                        var data2 = JSON.stringify(data1);
                        var d = JSON.stringify(da);
                        Login(data2, d, i);
                    }
                }
            });
    }
	function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	 dist = dist * 1.609344 ;
	//if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

};



exports.get = function(request, response) {
    response.send(statusCodes.OK, { message: 'Hello World!' });
};