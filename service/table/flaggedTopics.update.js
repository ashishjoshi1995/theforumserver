function update(item, user, request) {
	var toDeleteOpinionIds;
	if(item.flag_count>5){
		var topic = tables.getTable('topic');
		 topic.where({
            topic_id: item.topic_id,
        }).read({
                success: function(resultData) {
					topic.del({
						id:resultData[0].id
					});
					
					
                }
            });

		
		var opinion = tables.getTable('opinion');
		opinion.where({
					topic_id : item.topic_id
				}).read({
					success : function(resultData){
						for (var jj = 0; jj < resultData.length; jj++) {
                        //opinions.delete(resultData[jj]);
                         opinions.del({
                            id: resultData[jj].id
                        });
                    }
					}
				});
	}
		
    request.execute();

}