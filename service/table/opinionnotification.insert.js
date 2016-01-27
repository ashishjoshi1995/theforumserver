function insert(item, user, request) {
    item.newdownvotes = 0;
    item.newupvotes = 0;
    item.count = 0;
    request.execute();

}