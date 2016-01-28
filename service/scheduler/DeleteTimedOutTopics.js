var topic = tables.getTable('topic');
//var todoitem = tables.getTable('TodoItem');
var opinions = tables.getTable('opinion');
var user = tables.getTable('user');
var toDeleteTopicIds = [];
var j;
var id;
var points;
var owners;
var pt;
var renewed_count;
var renewal_request_ids;
function DeleteTimedOutTopics() {


    topic.where({

    }).read({
            success: function(results) {

                for (var i = 0; i < results.length; i++) {
                    if (results[i].hours_left >= 0) {

                        results[i].hours_left--;
                        topic.update(results[i]);
                    }
                    else {
                         toDeleteTopicIds.push(results[i].topic_id);
                        if (results[i].renewal_requests > 5) {
                            results[i].hours_left = 24;
                            owners = results[i].owners;
                            results[i].owners = results[i].owners + results[i].renewal_requests;
							results[i].previous_renewal_ids=results[i].previous_renewal_ids+" "+ results[i].renewal_request_ids;
							results[i].renewal_request_ids="";
                            results[i].renewal_requests = 0;
                            renewed_count = results[i].renewed_count;
                            results[i].renewed_count++;
                            id = results[i].uid;
                            points = results[i].points;
                            results[i].points = 0;
                            topic.update(results[i]);
                             insertPoints(points,id,results[i].previous_renewal_ids,owners,renewed_count);

                        } else
                        {
                               id = results[i].uid;
                                points = results[i].points;

                                topic.del({
                                id: results[i].id
                            });
                            deleteOpinion(results[i].topic_id);
                             user.where({
                            uid: id,

                                }).read({
                                success: insertItemInAllRows

                            });
                        }
                    }
                }
            }
        });

  

    
}
function insertItemInAllRows(aaalItems) {
                        if (aaalItems.length > 0) {
                            for (var tazo2 = 0; tazo2 < aaalItems.length; tazo2++) {
                                var tazo4 = aaalItems[tazo2].points_collected;
                                tazo4 = tazo4 + points;
                
                                aaalItems[tazo2].points_collected = tazo4;
                
                                user.update(aaalItems[tazo2]);
                            }
                        }
                    }
function deleteOpinion(deleteId){

        opinions.where({
            topic_id: deleteId,
        }).read({
                success: function(resultData) {
                    for (var jj = 0; jj < resultData.length; jj++) {
                        //opinions.delete(resultData[jj]);
                         opinions.del({
                            id: resultData[jj].id
                        });
                    }
                }
            });


}
function insertPoints(pt1,userId,renewalIds,owners1,renewCount) {
    pt=pt1;
    if (owners1 == 1) {
        user.where({
            uid: userId,

        }).read({
                success: uidpoints

            });

    }
    else if (owners1 > 1) {
        if (renewCount = 2) {
           pt=pt1*0.3;
            user.where({
                uid: userId,

            }).read({
                    success: uidpoints

                });
            var res = renewalIds.split(" ");
            for (var k = 1; k < res.length; k++) {
				
                pt=.7(pt1/renewCount);
				if(res[k] !=null){
                user.where({
                    uid: res[k]

                }).read({
                        success: uidpoints

                    });}
            }
        }

    }
    else if (owners1 > 1) {
        if (renewCount > 2) {

            var res = renewalIds.split(" ");
            for (var k = 0; k < res.length; k++) {
                pt = pt1 / renewCount;
				if(res[k] !=null){
                user.where({
                    uid: res[k]

                }).read({
                        success: uidpoints

                    });}
            }
        }

    }

}
function uidpoints(aaalItems) {
    if (aaalItems.length > 0) {
        

            aaalItems[0].points_collected =aaalItems[0].points_collected+pt;

            user.update(aaalItems[0]);
       
    }
}