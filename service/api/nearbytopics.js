// JavaScript Document


exports.post = function(request, response) {
		 var data = [];
		var tables = request.service.tables;
    var areatopics = tables.getTable('areatopics');
		 var postValues = request.body;
		 if (postValues.members != null)
        postValues = postValues.members;
		
		var item = {
        city : postValues.city,
        longitude : postValues.longitude,
		latitude : posetValues.latitude      
    }
		
		
		 areatopics.where({
            city: item.city
        }).read({
                success: function(results1) {
                   for (var j = 0; j < results.length; j++) {
						if(results1[j].longitude!=null && results1[j].latitude!=null){
							var dis=distance(results1[j].latitude,results1[j].longitude,item.latitude,item.longitude);
							if(dis>1){
								data.push(results1[j]);
							}
							else{continue;}
							
						}
						else{continue;}
						
						
				   }
				    var da2 = JSON.stringify(data);
                        response.send(statusCodes.OK, {
                            message: da2
                        });
				   
                }
            });

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