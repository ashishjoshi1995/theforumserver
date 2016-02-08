function update(item, user, request) {
	
	if(item.flag_count>7){
		//delete the opinion
		var opinion = tables.getTable('opinion');
		opinion.del({
					opinion_id : item.opinion_id
				});
	}
		
    request.execute();

}