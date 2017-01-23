module.exports = function(model, view, nodemailer, smtpTransport, generator, uuid){
	return {
		isEmail: function(req, res){
			//check if there is email in DB
			model.isEmail(req.body.emailUser, function(err, answerDB){
				//abstent email - create user
				if(answerDB.length == 0){
					//create user
					var registrEmailPass = generator.generate({
								length: 8,
								numbers: true
							});
					var unIdUser = uuid.v1();
					model.createUser(req.body.nameUser, req.body.passUser, req.body.emailUser, registrEmailPass, unIdUser, function(err, answerDB2){
						if(err) {
							res.status(500).send({'error': err});
						}
						else {
							//ok - user created on DB - send confirm code on email
							var transport = nodemailer.createTransport(
								smtpTransport({
									host: 'smtp.ukr.net',
									port: 465,
									secure: true,
									auth: {
										user: 'easystudywords@ukr.net',
										pass: 'vova4991XlQ25Jk'
									}
								})
	    					);
							
							var params = {
								from: 'easystudywords@ukr.net', 
								to: req.body.emailUser, 
								subject: 'Підтвердження реєстрації - EasyStudyWords',
								text: "Привіт " + "!\n\n" + 
									  "Ви надіслали запит на реєстрацію. \n\n" + 
									  "Введіть в поле підтвердження код підтвердження, який знаходиться нижче: \n\n" + 
									  "" + registrEmailPass + "\n\n" + 
									  "Дякую, з повагою команда EasyStudyWords."
							};

							transport.sendMail(params, function (err, res) {
								if (err) {
								}
							});

							res.json({ansServer: true});
						}
						
					});
				}
				//there is user with this email
				else {
					res.json({ansServer: false});
				}
			});
		},
		
		confirmRegist(req, res){
			model.confirmRegist(req.body.pass, function(err, answerDB){
				console.log(req.body.pass, answerDB);
				if(answerDB.affectedRows >= 1){
					res.status(200).send({"ansServer": true});
				}
				else if (answerDB.affectedRows == 0){
					console.log(111);
					res.json({"ansServer": false});
				}
			});
		},
		okCabinter(req, res){
			res.send({ success : true, message : 'authentication succeeded' });
		}
	}			
}

