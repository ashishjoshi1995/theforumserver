function update(item, user, request) {
	
	if(item.flag_count>5){
		//delete the opinion
		var opinion = tables.getTable('opinion');
		opinion.del({
					id : item.to_delete_id
				});
	}
		
    request.execute();

}