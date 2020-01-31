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
	var dtp6 = $('#dtp6');
	var dtp7 = $('#dtp7');
var izvestajiTabela = $('#izvestajiAdmin');
$("#prikaziIzvestaj").on( "click", function() {
	var DP = dtp6.val();
	var DD = dtp7.val();
	var params={
			'action':'izvestajiBrLeta',
			'dtp6':DP,
			'dtp7':DD
	};
	console.log(params);
		
		$.get('IzvestajiServlet', params, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}

				
			if (data.status == 'success') {
				izvestajiTabela.find('tr:gt(0)').remove();

				var izvestajiPrikaz1 = data.izvestajiBrLeta;
				
				izvestajiTabela.append('<tbody>');
				for (l in izvestajiPrikaz1) {
					izvestajiTabela.append(
							'<tr class=\'clickable-row\' data-href=\'url://\'>' +
							'<td>' + izvestajiPrikaz1[l].nazivAerodroma + '</td>' + 
							'<td>' + izvestajiPrikaz1[l].brojLetova + '</td>'+
							'<td>' + izvestajiPrikaz1[l].brojProdatihKarta + '</td>'+
							'<td>' + izvestajiPrikaz1[l].cenaKarataUkupna + '</td>'+
							'</tr>'
					)
				}
				
				izvestajiTabela.append('</tbody>');
				
			}
				
				
				//
		});

		
	});
	
	


	function getUlogovaniSpan(){
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
			
			
				
				
		});
		
	}
	getUlogovaniSpan();
	
});