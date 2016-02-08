var topic = tables.getTable('topic');
var todoitem = tables.getTable('TodoItem');
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
function DeleteTimedOutTopics()  {


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
                        if (results[i].renewal_requests >= 2) {
                            results[i].hours_left = 24;
                            owners = results[i].owners;
                            results[i].owners = results[i].owners + results[i].renewal_requests;
                            results[i].renewal_requests = 0;
                            renewed_count = results[i].renewed_count;
                            results[i].renewed_count++;
                            id = results[i].uid;
                            points = results[i].points;
                            results[i].points = 0;
                            topic.update(results[i]);
                             insertPoints();

                        } else {
                            id = results[i].uid;
                            points = results[i].points;
                           
                            topic.del({
                            id: results[i].id
                        });
                        deleteOpinion();
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
function deleteOpinion(){
      for (j = 0; j < toDeleteTopicIds.length; j++) {
        opinions.where({
            topic_id: toDeleteTopicIds[j],
        }).read({
                success: function(resultData) {
                    for (var jj = 0; jj < resultData.length; jj++) {
                        //opinions.delete(resultData[jj]);
                         topic.del({
                            id: resultData[jj].id
                        });
                    }
                }
            });

    }
}
function insertPoints() {
    pt=points;
    if (owners == 1) {
        user.where({
            uid: id,

        }).read({
                success: uidpoints

            });

    }
    else if (owners > 1) {
        if (renewed_count = 2) {
            pt = .3 * points;
            user.where({
                uid: id,

            }).read({
                    success: uidpoints

                });
            var res = renewal_request_ids.split(" ");
            for (var k = 1; k < res.length; k++) {
                pt = points / renewed_count;
                user.where({
                    uid: res[k]

                }).read({
                        success: uidpoints

                    });
            }
        }

    }
    else if (owners > 1) {
        if (renewed_count > 2) {

            var res = renewal_request_ids.split(" ");
            for (var k = 0; k < res.length; k++) {
                pt = points / renewed_count;
                user.where({
                    uid: res[k]

                }).read({
                        success: uidpoints

                    });
            }
        }

    }

}
function uidpoints(aaalItems) {
    if (aaalItems.length > 0) {
        for (var tazo2 = 0; tazo2 < aaalItems.length; tazo2++) {
            var tazo4 = aaalItems[tazo2].points_collected;
            tazo4 = tazo4 + pt;

            aaalItems[tazo2].points_collected = tazo4;

            user.update(aaalItems[tazo2]);
        }
    }
}