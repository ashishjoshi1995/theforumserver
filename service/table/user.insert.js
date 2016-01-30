function insert(item, user, request) {
item.points_collected = 0; 
item.status = "Rookie";  
item.upvotes_received=0;
item.downvotes_croaked=0;
item.upvotes_croaked=0;
item.downvotes_received=0;
item.renewal_request_croaked=0;
item.renewal_request_received=0;
item.toatal_topic_renewed=0;
item.total_topic_renewed_croaked=0;
item.total_characters=0;
item.opinions_count=0;
item.opinions_received=0;

item.uid = generateUUID();
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