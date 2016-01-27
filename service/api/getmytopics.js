exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;
    var data = [];

    var tables = request.service.tables;
    var postValues = request.body;

    if (postValues.members != null)
        postValues = postValues.members;

   
    
    var userDynamic = tables.getTable('user');
    var topics = tables.getTable('topic');
    
    userDynamic.where({
        uid: postValues.uid
    }).read({
            success: function(results) {
                var noto = results[0].current_topics;
                if(noto!=null){
                var noto2 = noto.split(" "); 
                for (var j = 0; j < noto2.length; j++) {
                    
                    topics.where({
                        topic_id : noto2[j]
                    }).read({
                        success:function(data){
                            data.push(data[0]);
                        }
                    });
                }
                var data2 = JSON.stringify(data);
                response.send(statusCodes.OK, {
                    message: data2
                });}
                else {response.send(statusCodes.OK, {
                    message: "no data"
                });}
            }
        });

};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message: 'Hello World!' });
};