exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;
    var data = [];

    var tables = request.service.tables;
    
    var userDynamic = tables.getTable('topic');
    userDynamic.where({
        uid: 121212
    }).read({
            success: function(results) {
                for (var j = 0; j < results.length; j++) {
                    data.push(results[j]);
                }
                var data2 = JSON.stringify(data);
                response.send(statusCodes.OK, {
                    message: data2
                });
            }
        });






};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message: 'Hello World!' });
};