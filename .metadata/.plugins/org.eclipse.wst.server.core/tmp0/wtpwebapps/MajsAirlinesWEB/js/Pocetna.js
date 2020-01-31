$(document).ready(function() {
	$('#myBtn').on('click', function(event) {
		$("#myModal").modal('show');
		var korisnickoImeUnos = $('#korisnickoImeUnos');
		var lozinkaUnos = $('#lozinkaUnos');

		$('#loginBtn').on('click', function(event) {
			var korisnickoIme = korisnickoImeUnos.val();
			var lozinka = lozinkaUnos.val();
			console.log('korisnickoIme: ' + korisnickoIme);
			console.log('lozinka: ' + lozinka);		
			
			if(korisnickoIme==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}
			if(lozinka==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}
			if(korisnickoIme=="" && lozinka==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}

			var params = {
				'korisnickoIme': korisnickoIme, 
				'lozinka': lozinka
			}
			
			$.post('LoginServlet', params, function(data) {
				console.log('stigao odgovor!')
				console.log(data);

				if (data.status == 'failure') {
					korisnickoImeUnos.val('');
					lozinkaUnos.val('');
					return;
				}
				if (data.status == 'success') {
					$.get('KorisnikServlet', {'action': 'ulogovaniKorisnikUloga'}, function(data) {
						console.log(data);

						if (data.status == 'unauthenticated') {
							window.location.replace('Pocetna.html');
							return;
						}

							
							if (data.ulogovaniKorisnikUloga == 'ADMIN') {
								window.location.replace('Administrator.html');
							}
							else{
								window.location.replace('Korisnik.html');
							}
					});

				}
			});
			
			console.log('poslat zahtev!')

			
			event.preventDefault();
			return false;
		});
	});
	
	$('#myBtnRegistracija').on('click', function(event) {
		$("#myModalRegistracija").modal('show');
		
		var korisnickoImeUnosRegistracija = $('#korisnickoImeUnosRegistracija');
		var lozinkaUnosRegistracija = $('#lozinkaUnosRegistracija');
		var lozinkaPonovljenaUnos = $('#lozinkaPonovljenaUnos');

		var messageParagraph = $('#messageParagraph');

		$('#registracijaBtn').on('click', function(event) {
			var korisnickoIme = korisnickoImeUnosRegistracija.val();
			var lozinka = lozinkaUnosRegistracija.val();
			var ponovljenaLozinka = lozinkaPonovljenaUnos.val();
			console.log('korisnickoIme: ' + korisnickoIme);
			console.log('lozinka: ' + lozinka);
			console.log('ponovljenaLozinka: ' + ponovljenaLozinka);

			if (lozinka != ponovljenaLozinka) {
				messageParagraph.text('Lozinke se ne podudaraju!');

				event.preventDefault();
				return false;
			}
			if(korisnickoIme==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}
			if(ponovljenaLozinka==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}
			if(lozinka==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}
			if(korisnickoIme=="" && lozinka==""){
				$("#modalLogin").modal('show');
				event.preventDefault();
				return false;
			}
			
			var params = {
				'korisnickoIme': korisnickoIme, 
				'lozinka': lozinka
			}
			$.post('RegistracijaKorisnikaServlet', params, function(data) {
				console.log(data);

				if (data.status == 'failure') {
					messageParagraph.text(data.message);
					return;
				}
				if (data.status == 'success') {
					$.post('LoginServlet', params, function(data) {
						console.log('stigao odgovor!')
						console.log(data);

						if (data.status == 'failure') {
							korisnickoImeUnos.val('');
							lozinkaUnos.val('');
							return;
						}
						if (data.status == 'success') {
							$.get('KorisnikServlet', {'action': 'ulogovaniKorisnikUloga'}, function(data) {
								console.log(data);

								if (data.status == 'unauthenticated') {
									window.location.replace('Prijava.html');
									return;
								}

									
									if (data.ulogovaniKorisnikUloga == 'KORISNIK') {
										window.location.replace('Korisnik.html');
									}
								
							});

						}
					});
				}
			});

			event.preventDefault();
			return false;
		});
	});
	
	 
	var letoviTabela = $('#letoviTabela');
	
	function getLetovi() {
		$.get("LetServlet", {'action': 'all'}, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Prijava.html');
				return;
			}

			if (data.status == 'success') {
				letoviTabela.find('tr:gt(0)').remove();

				var letoviPrikaz = data.letovi;
				letoviTabela.append('<tbody>');
				for (l in letoviPrikaz) {
					letoviTabela.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
							'<td>' + letoviPrikaz[l].brojLeta + '</td>' + 
							'<td>' + moment(letoviPrikaz[l].datumPolaska).format('YYYY-MM-DD HH:mm') + '</td>' + 
							'<td>' + moment(letoviPrikaz[l].datumDolaska).format('YYYY-MM-DD HH:mm') + '</td>' + 
							'<td>' + letoviPrikaz[l].aerodromPolazni + '</td>' + 
							'<td>' + letoviPrikaz[l].aerodromDolazni + '</td>' + 
							'<td>' + letoviPrikaz[l].brojSedista + '</td>' + 
							'<td>' + letoviPrikaz[l].brojSlobodnihSedista + '</td>' + 
							'<td>' + letoviPrikaz[l].cenaLeta + '</td>' + 
						'</tr>'
					)
				}
				letoviTabela.append('</tbody>');
				$(".clickable-row").on('click',function(event) {
					var id = letoviPrikaz[$(event.currentTarget).index()].id;
					var brojLeta=letoviPrikaz[$(event.currentTarget).index()].brojLeta;
					var datumPolaska=moment(letoviPrikaz[$(event.currentTarget).index()].datumPolaska).format('YYYY-MM-DD HH:mm');
					var datumDolaska=moment(letoviPrikaz[$(event.currentTarget).index()].datumDolaska).format('YYYY-MM-DD HH:mm');
					var polazniAerodrom=letoviPrikaz[$(event.currentTarget).index()].aerodromPolazni;
					var dolazniAerodrom=letoviPrikaz[$(event.currentTarget).index()].aerodromDolazni;
					var brojSedista=letoviPrikaz[$(event.currentTarget).index()].brojSedista;
					var brojSlobodnihSedista=letoviPrikaz[$(event.currentTarget).index()].brojSlobodnihSedista;
					var cena=letoviPrikaz[$(event.currentTarget).index()].cenaLeta;
					
					document.getElementById('brojLetaM').innerHTML = brojLeta;
					document.getElementById('datumPolaskaM').innerHTML = datumPolaska;
					document.getElementById('datumDolaskaM').innerHTML = datumDolaska;
					document.getElementById('polazniM').innerHTML = polazniAerodrom;
					document.getElementById('dolazniM').innerHTML = dolazniAerodrom;
					document.getElementById('brojSedistaM').innerHTML = brojSedista;
					document.getElementById('brojSlobodnihSedistaM').innerHTML = brojSlobodnihSedista;
					document.getElementById('cenaM').innerHTML = cena;
					
					$("#modalObavestenje").modal('show');
					
			        
			        
			    });
			}
		});
	}
	var polaziA = $('#polazniAerodromPonudjene');
	var dolazniA = $('#dolazniAerodromPonudjene');
	var dtp6 = $('#dtp6');
	var dtp7 = $('#dtp7');
	var cenaOd = $('#lowPriceFilterInput');
	var cenaDo = $('#highPriceFilterInput');
	var brojLeta = $('#brojLetaFilterInput');
	function filtriraniLetovi(){
		$('#nadjiLet').on('click', function(event) {
			
			var PA = polaziA.val();
			var DA = dolazniA.val();
			var DP = dtp6.val();
			var DD = dtp7.val();
			var CO = cenaOd.val();
			var CD = cenaDo.val();
			var BL = brojLeta.val();
			console.log('PA: ' + PA);
			console.log('DA: ' + DA);	
			console.log('DP: ' + DP);
			console.log('DD: ' + DD);
			console.log('CO: ' + CO);
			console.log('CD: ' + CD);
			console.log('BL: ' + BL);

			var params = {
					'action':'filtrirani',
					'PA' : PA,
					'DA' : DA,
					'DP' : DP,
					'DD' : DD,
					'CO' : CO,
					'CD' : CD,
					'BL' : BL
			};
			console.log(params)
			$.get('LetServlet', params, function(data) {
				console.log('stigao odgovor!')
				console.log(data);

				if (data.status == 'failure') {
//					
					return;
				}
				if (data.status == 'success') {
					letoviTabela.find('tr:gt(0)').remove();

					var letoviPrikaz = data.filtriraniLetovi;
					letoviTabela.append('<tbody>');
					for (l in letoviPrikaz) {
						letoviTabela.append(
							'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
								'<td>' + letoviPrikaz[l].brojLeta + '</td>' + 
								'<td>' + moment(letoviPrikaz[l].datumPolaska).format('YYYY-MM-DD hh:mm') + '</td>' + 
								'<td>' + moment(letoviPrikaz[l].datumDolaska).format('YYYY-MM-DD hh:mm') + '</td>' + 
								'<td>' + letoviPrikaz[l].aerodromPolazni + '</td>' + 
								'<td>' + letoviPrikaz[l].aerodromDolazni + '</td>' + 
								'<td>' + letoviPrikaz[l].brojSedista + '</td>' + 
								'<td>' + letoviPrikaz[l].brojSlobodnihSedista + '</td>' +
								'<td>' + letoviPrikaz[l].cenaLeta + '</td>' + 
							'</tr>'
						)
					}
					letoviTabela.append('</tbody>');
					$(".clickable-row").on('click',function(event) {
						var id = letoviPrikaz[$(event.currentTarget).index()].id;
						var brojLeta=letoviPrikaz[$(event.currentTarget).index()].brojLeta;
						var datumPolaska=moment(letoviPrikaz[$(event.currentTarget).index()].datumPolaska).format('YYYY-MM-DD HH:mm');
						var datumDolaska=moment(letoviPrikaz[$(event.currentTarget).index()].datumDolaska).format('YYYY-MM-DD HH:mm');
						var polazniAerodrom=letoviPrikaz[$(event.currentTarget).index()].aerodromPolazni;
						var dolazniAerodrom=letoviPrikaz[$(event.currentTarget).index()].aerodromDolazni;
						var brojSedista=letoviPrikaz[$(event.currentTarget).index()].brojSedista;
						var brojSlobodnihSedista=letoviPrikaz[$(event.currentTarget).index()].brojSlobodnihSedista;
						var cena=letoviPrikaz[$(event.currentTarget).index()].cenaLeta;
						
						document.getElementById('brojLetaM').innerHTML = brojLeta;
						document.getElementById('datumPolaskaM').innerHTML = datumPolaska;
						document.getElementById('datumDolaskaM').innerHTML = datumDolaska;
						document.getElementById('polazniM').innerHTML = polazniAerodrom;
						document.getElementById('dolazniM').innerHTML = dolazniAerodrom;
						document.getElementById('brojSedistaM').innerHTML = brojSedista;
						document.getElementById('brojSlobodnihSedistaM').innerHTML = brojSlobodnihSedista;
						document.getElementById('cenaM').innerHTML = cena;
						
						$("#modalObavestenje").modal('show');
					});
				}
			
			});
			console.log('poslat zahtev!')

			
			event.preventDefault();
			return false;
		});
	}
	$('#osvezi').on('click', function(event) {
		getLetovi();
	});
	filtriraniLetovi();
	getLetovi();
});