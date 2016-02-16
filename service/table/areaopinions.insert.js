function insert(item, user, request) {

    item.opinion_id = generateUUID();
    item.upvotes = 0;
    item.downvotes = 0;
    item.notif_count = 0;
    item.notif_downvotes = 0;
    item.notif_upvotes = 0;
    var topic = tables.getTable('areatopics');
	
	 var user = tables.getTable('user');

	
	user.where({
        uid: item.uid
    }).read({
            success: function(data1) {
                if(data1[0].opinions_count!=null){
					data1[0].opinions_count++;}
					else{data1[0].opinions_count=1;}
					data1[0].total_characters=item.opinion.length;
					user.update(data1[0]);

            }
        });

    topic.where({
        topic_id: item.topic_id,
    }).read({
         success : function (results) {
                results[0].total_opinions=results[0].total_opinions+1;
                results[0].notif_count = results[0].notif_count+1;
                results[0].notif_new_opinions = results[0].notif_new_opinions+1;
                if(results[0].opinion_ids == null){
                    results[0].opinion_ids = item.opinion_id;
                }
                else{
                results[0].opinion_ids =results[0].opinion_ids+ " " + item.opinion_id;
                }
                results[0].points = results[0].points + 2;
                topic.update(results[0]);
				opinionReceivedUpdate(results[0].uid);
            }
        });
function opinionReceivedUpdate(uid1){
	user.where({
        uid: uid1
    }).read({
            success: function(data1) {
                if(data1[0].opinions_received!=null){
					data1[0].opinions_received++;}
					else{data1[0].opinions_received=1;}
					
					user.update(data1[0]);

            }
        });
}
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