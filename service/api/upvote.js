exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;


    var tables = request.service.tables;
    var postValues = request.body;
    var opinion = tables.getTable('opinion');
    var user = tables.getTable('user');

    if (postValues.members != null)
        postValues = postValues.members;

    var item = {
        opinion_id: postValues.opinion_id,
        opinion_owner_uid: postValues.opinion_owner_id,
        operation_chosen: postValues.operation_chosen,
        id: postValues.id
    }


   var id;

    opinion.where({
        opinion_id: postValues.opinion_id
    }).read({
            success: function(data) {
                id=data[0].uid;
                if (item.operation_chosen == 1) {
                    
                    data[0].upvotes = data[0].upvotes + 1;
                    
                    data[0].notif_count++;
                    data[0].notif_upvotes = data[0].notif_upvotes + 1;
                    if (data[0].upvote_ids != null) {
                        data[0].upvote_ids = data[0].upvote_ids + " " + item.id;
                    }
                    else { data[0].upvote_ids = item.id; }
                }
                else {
                    data[0].notif_count++;
                    data[0].downvotes = data[0].downvotes + 1;
                    data[0].notif_downvotes = data[0].notif_downvotes + 1;
                    if (data[0].downvote_ids != null) {
                        data[0].downvote_ids = data[0].downvote_ids + " " + item.id;
                    }
                    else { data[0].downvote_ids = item.id; }
                }
                opinion.update(data[0]);
                hello(id);
            }
        });
        function hello( j){
        user.where({
        uid: j
    }).read({
            success: function(data) {
                if (item.operation_chosen == 1) {
                    data[0].points_collected = data[0].points_collected + 1;
                    user.update(data[0]);
                }
                else {
                    data[0].points_collected = data[0].points_collected - 1;
                    user.update(data[0]);

                }

            }
        });
        }

    response.send(statusCodes.OK, { message: 'Operation Successful' });

};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message: 'Hello World!' });
};