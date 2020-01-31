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
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];

	
	var params = {
			'action': 'pojedinacnaKarta',
			'id':id
	};
	getKarta(params);
	var params1 = {
			'action': 'pojedinacnaKarta',
			'id':id
	};
	var params2 = {
			'action': 'pojedinacna',
			'id':id
	};	
	console.log(params1);
	getKarta1(params1,params2);

		
		
	var params2 = {
			'action': 'pojedinacna',
			'id':id
	};	
		
			
						

	
		
		

	

	
	
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
			var korisnikId=korisnik.id;
			$("#userSpan").text(korisnickoIme.toUpperCase());
			
			console.log(korisnickoIme);
			$('#obrisiKartu').on('click', function(event) {
				
			});
			
			
			
				
				
		});
		
	}





	getUlogovani();



	
});
function getKarta1(params1,params2){
	$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
		
		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}
		console.log(data);
		var korisnik = data.ulogovaniKorisnik;
		console.log(korisnik);

		$.get('KartaServlet', params2, function(data) {
			
			
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}
			var karta=data.pojedinacnaKarta
	$.get('KartaServlet', params1, function(data) {
		
		
		
		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}
		if(data.status=='success'){
			var izabranaKarta = data.pojedinacnaKarta;
			console.log("nadjena"+izabranaKarta.id);
			
			$('#izmeniKartu').on('click', function(event) {
				
				if(izabranaKarta.datumRezervacije!=null && !korisnik.blokiran==true){
					window.location.replace("Karta3Izmena.html?id="+izabranaKarta.idPolaznog+"&idP="+izabranaKarta.idPovratnog+"&idk="+izabranaKarta.id);
			    	
					
				}

				else {
					$("#modalIzmeni").modal('show');
					
					return ;
					
				}
				
				event.preventDefault();
				return false;
			});
			$('#obrisiKartu').on('click', function(event) {
				$('#modalObrisi').modal('show');
				$('#btnOKI').on('click', function(event) {
				params = {
						'action': 'delete',
						'id': izabranaKarta.id
					};
					console.log(params);
				if(izabranaKarta.datumRezervacije!=null && !korisnik.blokiran==true){
					$.post('KartaServlet', params, function(data) {
						
						if (data.status == 'unauthenticated') {
							window.location.replace('Pocetna.html');
							return;
						}

						if (data.status == 'success') {
							if (data.korisnik == 'ADMIN') {
								window.location.replace('Administrator.html');
							}
							else{
								window.location.replace('Korisnik.html');
							}
						}
					});
					
					
					
				}

				else{
					$("#modalIzmeni").modal('show');
					
					return;
					
				}
				
				});
			});
			
			
			
		}

	});
	});

	});	
}
function getKarta(params){

	$.get('KartaServlet', params, function(data) {
		
		
		
		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}
		if(data.status=='success'){
			var izabranaKarta = data.pojedinacnaKarta;
			console.log(izabranaKarta);
			
			
			$('#brojLetaL').text(izabranaKarta.brojPolaznog);
			
			$("#brojLetaP").text(izabranaKarta.brojPovratnog);
			$("#korIme").text(izabranaKarta.korIme);
			$("#sedistePol").text(izabranaKarta.sedidteNaPolaznomLetu);
			$("#sedistePov").text(izabranaKarta.sedidteNaPovratnomLetu);
			$("#cenaL").text(izabranaKarta.cena);
			
		
				$('a[href$="#goKorisnik"]').on( "click", function() {
					$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
						
						if (data.status == 'unauthenticated') {
							window.location.replace('Pocetna.html');
							return;
						}
						console.log(data);
						var korisnik = data.ulogovaniKorisnik;
						console.log(korisnik);
						
						
						
						
							
							
					
					console.log("uloga kliknut href"+korisnik.uloga)
					if (korisnik.uloga == 'ADMIN') {
						window.location.replace("KorisnikAdmin.html?id="+izabranaKarta.idKor);
					}
					else{
						window.location.replace("Profil.html?id="+izabranaKarta.idKor);
					}
					});
				});
				$('a[href$="#goLET"]').on( "click", function() {
					$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
						
						if (data.status == 'unauthenticated') {
							window.location.replace('Pocetna.html');
							return;
						}
						console.log(data);
						var korisnik = data.ulogovaniKorisnik;
						console.log(korisnik);
						
						
						
						
							
							
					
					if (korisnik.uloga == 'ADMIN') {
						window.location.replace("LetAdmin.html?id="+izabranaKarta.idPovratnog);
					}
					else{
						window.location.replace("LetKorisnik.html?id="+izabranaKarta.idPovratnog);
					}
					});
				});
				$('a[href$="#goLet"]').on( "click", function() {
					$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
						
						if (data.status == 'unauthenticated') {
							window.location.replace('Pocetna.html');
							return;
						}
						console.log(data);
						var korisnik = data.ulogovaniKorisnik;
						console.log(korisnik);
						
						
						
						
							
							
					
					  
					  if (korisnik.uloga == 'ADMIN') {
							window.location.replace("LetAdmin.html?id="+izabranaKarta.idPolaznog);
						}
						else{
							window.location.replace("LetKorisnik.html?id="+izabranaKarta.idPolaznog);
						}
					});
				});
	
			}

		
	});
	
}
