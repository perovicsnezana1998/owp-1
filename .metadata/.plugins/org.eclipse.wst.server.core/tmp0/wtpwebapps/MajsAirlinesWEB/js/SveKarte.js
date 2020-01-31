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
var karteTabela = $('#rezervisaneKarte');
var karteTabelaKupljene = $('#kupljeneKarte');
	
	function getKarta() {
		$.get("KartaServlet", {'action': 'sveKarteAdmin'}, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Prijava.html');
				return;
			}

			if (data.status == 'success') {
				karteTabela.find('tr:gt(0)').remove();

				var kartePrikaz = data.karteLetAdmin;
				console.log(kartePrikaz);
				karteTabela.append('<tbody>');
				for (l in kartePrikaz) {
					
					karteTabela.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
							 
							'<td>' + moment(kartePrikaz[l].datumRezervacije).format('YYYY-MM-DD HH:mm') + '</td>' + 
							'<td>' + kartePrikaz[l].ime + '</td>'+
						'</tr>'
					)
					
				}
				karteTabela.append('</tbody>');
				$(".clickable-row").on('click',function(event) {
					
					var id = kartePrikaz[$(event.currentTarget).index()].id;
					console.log(id);
					window.location = "KartaPrikaz.html?id="+id;
					
			        
			        
			    });
			}
		});
	}
	function getKartaKupljena() {
		$.get("KartaServlet", {'action': 'sveKarteAdminKupljene'}, function(data) {
			console.log(data);
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Prijava.html');
				return;
			}

			if (data.status == 'success') {
				karteTabelaKupljene.find('tr:gt(0)').remove();

				var kartePrikaz = data.karteLetAdminK;
				console.log(kartePrikaz);
				karteTabelaKupljene.append('<tbody>');
				for (l in kartePrikaz) {
					
					karteTabelaKupljene.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
							 
							'<td>' + moment(kartePrikaz[l].datumProdajeKarte).format('YYYY-MM-DD HH:mm') + '</td>' + 
							'<td>' + kartePrikaz[l].ime + '</td>'+
						'</tr>'
					)
					
				}
				karteTabelaKupljene.append('</tbody>');
				$(".clickable-row").on('click',function(event) {
					
					
					var id = kartePrikaz[$(event.currentTarget).index()].id;
					console.log(id);
					window.location = "KartaPrikaz.html?id="+id;
			        
			        
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
			

				event.preventDefault();
				return false;
		
			
			
				
				
		});
		
		
	}

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
	getUlogovani();
	getKarta();
	getKartaKupljena();
	
});