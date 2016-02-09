function update(item, user, request) {
	
	if(item.flag_count>1){
		//delete the opinion
		var opinion = tables.getTable('opinion');
		opinion.del({
					opinion_id : item.opinion_id
				});
	}
		
    request.execute();

}