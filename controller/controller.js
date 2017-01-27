module.exports = function(model, view, request, cheerio){
	return {
		getWords: function(req, res){
			var addWords = 2;
			var arrWords = [];
			// get new words
			model.getNewWords(function(err, answerDBNW){
				arrWords.push(answerDBNW);
				// get familiar words
				model.getFamiliarWords(addWords, function(err, answerDBFW){
					answerDBFW.length == 0 ? arrWords.push([]) : arrWords.push(answerDBFW);
					answerDBFW.length < addWords ? addWords = 2 + (addWords - answerDBFW.length) : addWords = 2;
					// get intermediate words
					model.getIntermediateWords(addWords,  function(err, answerDBIW){
						answerDBIW.length == 0 ? arrWords.push([]) : arrWords.push(answerDBIW);
						answerDBIW.length < addWords ? addWords = 2 + (addWords - answerDBIW.length) : addWords = 2;
						//get almost Know Words
						model.getAlmostKnowWords(addWords, function(err, answerDBAW){
							arrWords.push(answerDBAW);	
							res.json(arrWords);
						});

					});
				});
			});				   
		},
		
		setStatusWord: function(req, res) {
			console.log(req.body.word);
			model.getStatusWord(req.body.word, function(err, answerDB){
				// colums of word's status
				var arrCol = [ "stnew", "stfamiliar", "stintermediate", "stalmostknow", "stknow"];
				//iteration for founding status word
				var iter = 0;
				//founding status word
				while (answerDB[0][arrCol[iter]] != 1) {
					iter++;
				}
				//if we answered right - up status
				if(req.body.status == 1) {
					model.changeStatusWord(arrCol[iter], arrCol[iter + 1], answerDB[0].id, function(err, answerDB){
						var answerClient = "ok";
						res.json(answerClient);
					});
				}
				//if we answered false - down status
				else {
					//for new word - nothing
					if (iter != 0) {
						model.changeStatusWord(arrCol[iter], arrCol[iter - 1], answerDB[0].id, function(err, answerDB){
							var answerClient = "ok";
							res.json(answerClient);
						});
					}
				}
			});
		},
		
		getCatalog: function(req, res){
			model.getUsingTable(req.session.passport.user, function(err, arrUserTable){
				if(err){ res.status(500).send({"answer": "DB problem - " + err});}
				else {
					model.getRealTableName(function(err, answerRealTable){
						if(err){res.status(500).send({"answer": "DB problem - " + err});}
						else {
							view.getCatalog(arrUserTable, answerRealTable, function(arrCardsCatalog){
								res.json(arrCardsCatalog);
							});
						}
					});	
				}
			});
		},
		
		addCardToUser: function(req, res){
			model.createTableCard(req.session.passport.user, req.body.mustAddCard, function(err, answerDB){
				if(err){res.status(500).send({success: false});}
				else {
					res.status(200).send({success: true});
				}
			});
		},
		
		deleteUserCard: function(req, res){
			model.deleteUserCard(req.session.passport.user, req.query.delCard, function(err, answerDB){
				if(err){res.status(500).send({success: false});}
				else {
					res.status(200).send({success: true});
				}
			});
		},
		
		changePriorityCard: function(req, res){
			model.changePriorityCard(req.session.passport.user, req.body.card, function(err, answerDB){
				if(err){res.status(500).send({success: false});}
				else {
					//set cookie - priority card - faster get necessary information
					res.cookie('priority_card', answerDB[0].dbname, { path: '/', httpOnly: true, maxAge: 0x7FFFFFFF }).send({ success : true });
				}
			});
		}
	}			
}

