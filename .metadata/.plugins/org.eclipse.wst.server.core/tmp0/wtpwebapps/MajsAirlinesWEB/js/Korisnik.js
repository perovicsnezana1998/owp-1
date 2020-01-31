$(document).ready(function() {
	$('a[href$="#modalLogout"]').on( "click", function() {
		   $('#modalLogout').modal('show');
		   $('#btnOK').on('click', function(event) {
				
				$.get('LogoutServlet', function(data) {
					console.log(data);

					if (data.status == 'unauthenticated') {
						window.location.replace('Pocetna.html');
						return;
					}
				});
			
				event.preventDefault();
				return false;
			});
		});
$("#povratak").on( "click", function() {
		
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
					console.log(id);
					window.location = "LetKorisnik.html?id="+id;
					
					
			        
			        
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
						console.log(id);
						window.location = "LetKorisnik.html?id="+id;
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
	
	function getUlogovani(){
		$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}
			
				console.log(data);
				var korisnik = data.ulogovaniKorisnik;
				console.log(korisnik);
				var korisnickoIme = korisnik.korisnickoIme;
				$("#userSpan").text(korisnickoIme.toUpperCase());
				
				console.log(korisnickoIme);
				
					$('#kupiRezervisiKartuBezLeta').on('click', function(event) {
						if(korisnik.blokiran==true){
							$("#modalBlokiran").modal('show');
							event.preventDefault();
							return false;
							
						}else{
						
							window.location = "Karta1.html";
						}  
					});
					$("#prikazKarataKorisnik").on( "click", function() {
						
						window.location.replace('MojeKarte.html');
						return;

						
					});
				
				
			
			
			
				
				
		});
		
	}
	getUlogovani();
	filtriraniLetovi();
	getLetovi();
});