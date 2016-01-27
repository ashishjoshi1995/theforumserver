function insert(item, user, request) {
item.topic_id = generateUUID();
item.owners=1;
item.points=5;
item.hours_left=24;
item.renewed_count=0;
item.total_opinions = 0;
item.notif_count = 0;

//item.renewal_request_ids=item.uid;
item.renewal_requests=0;
var user= tables.getTable('user');

    user.where({
        uid: item.uid,
    }).read({
         success : function (results) {
                
                if(results[0].current_topics == null){
                    results[0].current_topics = item.topic_id;
                 
                }
                else{
                results[0].current_topics =results[0].current_topics+ " " + item.topic_id;
                }
                results[0].topics_created = results[0].topics_created+1;
                user.update(results[0]);
            }
        });

    request.execute();

}

function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }