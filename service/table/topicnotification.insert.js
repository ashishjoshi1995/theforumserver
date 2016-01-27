function insert(item, user, request) {
    item.new_opinions = 0;
    item.new_renewable_request = 0;
    request.execute();
}