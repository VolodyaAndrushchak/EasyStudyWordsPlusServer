module.exports = function(pool){
	return {

		getNewWords: function(callback){
			
			pool.query("SELECT wordfirst1000.english, wordfirst1000.transcription, wordfirst1000.translation FROM wordfirst1000 INNER JOIN usertablewords ON wordfirst1000.id = usertablewords.id WHERE usertablewords.stnew = 1 LIMIT 6", callback);
		},
		
		getFamiliarWords: function(addWords, callback){
			pool.query("SELECT wordfirst1000.english, wordfirst1000.transcription, wordfirst1000.translation FROM wordfirst1000 INNER JOIN usertablewords ON wordfirst1000.id = usertablewords.id WHERE usertablewords.stfamiliar = 1 LIMIT " + addWords, callback);
		},
		
		getIntermediateWords: function(addWords, callback) {
			pool.query("SELECT wordfirst1000.english, wordfirst1000.transcription, wordfirst1000.translation FROM wordfirst1000 INNER JOIN usertablewords ON wordfirst1000.id = usertablewords.id WHERE usertablewords.stintermediate = 1 LIMIT " + addWords, callback);
		},
		
		getAlmostKnowWords: function(addWords, callback){
			pool.query("SELECT wordfirst1000.english, wordfirst1000.transcription, wordfirst1000.translation FROM wordfirst1000 INNER JOIN usertablewords ON wordfirst1000.id = usertablewords.id WHERE usertablewords.stalmostknow = 1 LIMIT " + addWords, callback);
		},
		
		getStatusWord: function(word, callback) {
			pool.query("SELECT * FROM usertablewords INNER JOIN wordfirst1000 ON wordfirst1000.id = usertablewords.id WHERE wordfirst1000.english = ?", [word], callback);
		},
		
		changeStatusWord: function(prevCol, nextCol, idWord, callback){
			console.log(prevCol, nextCol, idWord);
			pool.query("UPDATE usertablewords SET ?? = 0 WHERE id = ?", [prevCol, idWord], function(err, answerDB){
				pool.query("UPDATE usertablewords SET ?? = 1 WHERE id = ?", [nextCol, idWord]);
			});
		}
	
	}
}