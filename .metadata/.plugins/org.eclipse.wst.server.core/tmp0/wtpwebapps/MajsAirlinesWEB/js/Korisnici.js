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
$("#korisniciA").on( "click", function(event) {
		
		$.get("KorisnikServlet", {'action': 'allAdmin'}, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}

			if (data.status == 'success') {
				
				korisniciTabela.find('tr:gt(0)').remove();

				var korisniciPrikaz = data.korisnici;
				korisniciTabela.append('<tbody>');
				for (l in korisniciPrikaz) {
					korisniciTabela.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
							'<td>' + korisniciPrikaz[l].korisnickoIme + '</td>' + 
							'<td>' + moment(korisniciPrikaz[l].datumRegistracije).format('YYYY-MM-DD HH:mm') + '</td>' + 
							
							'<td>' + korisniciPrikaz[l].uloga + '</td>' + 
							'<td>' + korisniciPrikaz[l].blokiran + '</td>' +
							
						'</tr>'
							
					);
					
				}
				korisniciTabela.append('</tbody>');
				$(".clickable-row").on('click',function(event) {
					var id = korisniciPrikaz[$(event.currentTarget).index()].id;
					console.log(id);
					window.location.replace('KorisnikAdmin.html?id='+id);
					
					
			        
			        
			    });

			}
			
		});

			
});

$("#korisnici").on( "click", function(event) {
	
	getKorisnici();

		
	});

$("#korisniciKor").on( "click", function(event) {
	
	$.get("KorisnikServlet", {'action': 'allKorisnik'}, function(data) {
		console.log(data);

		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}

		if (data.status == 'success') {
			
			korisniciTabela.find('tr:gt(0)').remove();

			var korisniciPrikaz = data.korisnici;
			korisniciTabela.append('<tbody>');
			for (l in korisniciPrikaz) {
				korisniciTabela.append(
					'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
						'<td>' + korisniciPrikaz[l].korisnickoIme + '</td>' + 
						'<td>' + moment(korisniciPrikaz[l].datumRegistracije).format('YYYY-MM-DD HH:mm') + '</td>' + 
						
						'<td>' + korisniciPrikaz[l].uloga + '</td>' + 
						'<td>' + korisniciPrikaz[l].blokiran + '</td>' +
						
					'</tr>'
						
				);
				
			}
			korisniciTabela.append('</tbody>');
			$(".clickable-row").on('click',function(event) {
				var id = korisniciPrikaz[$(event.currentTarget).index()].id;
				console.log(id);
				window.location.replace('KorisnikAdmin.html?id='+id);
				
				
		        
		        
		    });

		}
		
	});

		
});

	
	var korisniciTabela = $('#korisniciTabela');
	function getKorisnici() {
		$.get("KorisnikServlet", {'action': 'all'}, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}

			if (data.status == 'success') {
				
				korisniciTabela.find('tr:gt(0)').remove();

				var korisniciPrikaz = data.korisnici;
				korisniciTabela.append('<tbody>');
				for (l in korisniciPrikaz) {
					korisniciTabela.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
							'<td>' + korisniciPrikaz[l].korisnickoIme + '</td>' + 
							'<td>' + moment(korisniciPrikaz[l].datumRegistracije).format('YYYY-MM-DD HH:mm') + '</td>' + 
							
							'<td>' + korisniciPrikaz[l].uloga + '</td>' + 
							'<td>' + korisniciPrikaz[l].blokiran + '</td>' +
							
						'</tr>'
							
					);
					
				}
				korisniciTabela.append('</tbody>');
				$(".clickable-row").on('click',function(event) {
					var id = korisniciPrikaz[$(event.currentTarget).index()].id;
					console.log(id);
					window.location.replace('KorisnikAdmin.html?id='+id);
					
					
			        
			        
			    });

			}
			
		});
	}

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
				
					
			
			
			
				
				
		});
		
	}
	getUlogovani();

	getKorisnici();
});