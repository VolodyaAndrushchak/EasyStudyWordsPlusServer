function getCatalog(UserTable, RealTable, callback) {
	//число 5 в таблицю і кук
	//create array of user's added cards
	var arrUserTable = [];
	UserTable.forEach(function(value, index){
		arrUserTable.push({
			usercard: value.nameTable,
			priority: value.priority
		});
	});
	
	//create array of all cards
	var arrRealTable = [];
	RealTable.forEach(function(value, index){
		arrRealTable.push(value.realname);
	});
	
	//create array of catalog cards
	var arrCatalog = arrRealTable;
	for(var j = 0; j < arrUserTable.length; j++)
	{
		arrCatalog.splice(arrCatalog.indexOf(arrUserTable[j].usercard), 1);
	}

	callback({catalog: arrCatalog, addedCard: arrUserTable});
}
	
module.exports = {
	getCatalog
}