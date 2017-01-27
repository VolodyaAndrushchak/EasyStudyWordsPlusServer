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
			pool.query("UPDATE usertablewords SET ?? = 0 WHERE id = ?", [prevCol, idWord], function(err, answerDB){
				pool.query("UPDATE usertablewords SET ?? = 1 WHERE id = ?", [nextCol, idWord]);
			});
		},
		
		getUsingTable: function(idUser, callback){
			var nameTable = idUser + "UsTab";
			pool.query("SELECT nameTable, priority FROM ??", [nameTable], callback);
		},
		
		getRealTableName: function(callback){
			pool.query("SELECT * FROM realtablename", callback);
		},
		
		createTableCard: function(iduser, card, callback){
			pool.query("SELECT dbname FROM realtablename WHERE realname = ? LIMIT 1", [card], function(err, answerDB){
				var tablename = iduser+answerDB[0].dbname;
				pool.query("CREATE TABLE IF NOT EXISTS ??" + 
						"(id int(7) unsigned NOT NULL AUTO_INCREMENT," +
						"stnew int(1) DEFAULT NULL," +  
						"stfamiliar int(1) DEFAULT NULL," +  
						"stintermediate int(1) DEFAULT NULL," +  
						"stalmostknow int(1) DEFAULT NULL," +  
						"stknow int(1) DEFAULT NULL," +  
						"PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8", [tablename], function(err, answerDB1){
							pool.query("INSERT INTO ?? SELECT * FROM usertablewords", [tablename], function(err, answerDB2){
								var nameUsingTable = iduser + "UsTab";
								pool.query("INSERT INTO ?? (nameTable, added) VALUES (?, ?)", [nameUsingTable, card, 1], callback);
							});					
				});
			});	
		},
		
		deleteUserCard: function(idUser, card, callback){
			//get real name table
			pool.query("SELECT dbname FROM realtablename WHERE realname = ?", [card], function(err, answerDB){
				var delTableName = idUser + answerDB[0].dbname;
				//delete table with words
				pool.query("DROP TABLE ??", [delTableName], function(err, answerDB2){
					var updateUsTab = idUser + "ustab";
					//change status words
					pool.query("DELETE FROM ?? WHERE nameTable = ?", [updateUsTab, card], callback);
				});
			});
		},
		
		//change priority card for user
		changePriorityCard: function(IdUser, card, callback){
			var locNameTable = IdUser + "ustab";
			pool.query("UPDATE ?? SET priority = null WHERE priority = 1", [locNameTable], function(err, answerDB2){
				if(!err){
					pool.query("UPDATE ?? SET priority = 1 WHERE nameTable = ?", [locNameTable,card], function(err,answerDB3){
						pool.query("SELECT dbname FROM realtablename WHERE realname = ?", [card], callback);
					}); 
				}
			});
		},
		
		//model for users
		
		isEmail: function(user_mail, callback){
			pool.query("SELECT * FROM users WHERE email = ?", [user_mail], callback);
		},
		
		createUser: function(nameUser, passUser, emailUser, registrEmailPass, unIdUser, callback){
			pool.query("INSERT INTO users (nameUser, password, email, registrEmailPass, unIdUser) VALUES (?, ?, ?, ?, ?)", [nameUser, passUser, emailUser, registrEmailPass, unIdUser], function(err, answerDB){
				if(!err){
					var nameUsingTable = unIdUser + "UsTab";
					pool.query("CREATE TABLE IF NOT EXISTS ??" + 
						"(nameTable varchar(40) NOT NULL," +
						"added int(1) DEFAULT NULL," +  
						"catalog int(1) DEFAULT NULL," +  
						"PRIMARY KEY (nameTable)) DEFAULT CHARACTER SET utf8", [nameUsingTable], callback);
				}
			});
		},
		
		confirmRegist: function(pass, callback){
			pool.query("UPDATE users SET activated = 1 WHERE registrEmailPass = ?", [pass], callback);
		},
		
		checkUser: function(userEmail, callback){
			pool.query("SELECT id,  email, token, unIdUser, activated, password FROM users WHERE email = ?", [userEmail], callback);
		},
		
		findUser: function(token, callback){
			pool.query("SELECT id,  email, token, unIdUser FROM users WHERE token = ? LIMIT 1", [token], callback);
		},
		
		writeToken: function(token, iduser, callback){
			pool.query("UPDATE users SET token = ? WHERE unIdUser = ?", [token, iduser], callback);
		},
		writeTokenByEmail: function(token, email, callback){
			pool.query("UPDATE users SET token = ? WHERE email = ?", [token, email], callback);
		},
		findUserById: function(id, callback){
			pool.query("SELECT id, email, token, unIdUser FROM users WHERE unIdUser = ?", [id], callback);
		},
		delToken: function(idUser, callback){
			pool.query("UPDATE users SET token = '' WHERE unIdUser = ?", [idUser], callback);
		},
		getUserName: function(idUser, callback){
			pool.query("SELECT nameUser FROM users WHERE unIdUser = ?", [idUser], callback);
		},
		getPriorityCard: function(idUser, callback){
			var locNameTable = idUser + "ustab";
			pool.query("SELECT nameTable from ?? WHERE priority = 1", [locNameTable], callback);
		}
	
	}
}