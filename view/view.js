function getCatalog(UserTable, RealTable, callback) {
	//число 5 в таблицю і кук
	var arrUserTable = [];
	UserTable.forEach(function(value, index){
		arrUserTable.push(value.nameTable);
	});
	
	var arrRealTable = [];
	RealTable.forEach(function(value, index){
		arrRealTable.push(value.realname);
	});
	
	var arrCatalog = [];
	arrRealTable.forEach(function(value){
		if (arrUserTable.indexOf(value) == -1) {
			arrCatalog.push(value);
		}
	});
	
	//console.log(arrCatalog);
	callback({catalog: arrCatalog, addedCard: arrUserTable});
}
/*function getNews(req, answerDB, cheerio, body,  callback) {
}*/

module.exports = {
	getCatalog
}