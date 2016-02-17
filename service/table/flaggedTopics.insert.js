function insert(item, user, request) {
	var topics = tables.getTable('topic');
	topics.where({
            topic_id: item.topic_id,
        }).read({
                success: function(resultData) {
					item.topic_description=resultData[0].description;
					item.topic_text=resultData[0].topic;
                }
            });
    request.execute();

}