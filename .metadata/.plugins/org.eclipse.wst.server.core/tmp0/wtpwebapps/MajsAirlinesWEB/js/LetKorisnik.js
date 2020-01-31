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
	console.log(id);
	
	var params = {
			'action': 'uzmiLetPoID',
			'ID':id
	}
	function getLet(params){
	$.get('KartaServlet', params, function(data) {
		
		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}
		if(data.status=='success'){
			var izabranLet = data.letPoID;
			console.log(izabranLet);
			
			$("#brojLetaL").text(izabranLet.brojLeta);
			$("#datumPolaskaL").text(moment(izabranLet.datumPolaska).format('YYYY-MM-DD HH:mm'));
			$("#datumDolaskaL").text(moment(izabranLet.datumDolaska).format('YYYY-MM-DD HH:mm'));
			$("#polazniL").text(izabranLet.aerodromPolazni);
			$("#dolazniL").text(izabranLet.aerodromDolazni);
			$("#brojSedistaL").text(izabranLet.brojSedista);
			$("#brojSlobodnihSedistaL").text(izabranLet.brojSlobodnihSedista);
			$("#cenaL").text(izabranLet.cenaLeta);
			
		}
		$('#kupiRezervisiKartuSaLeta').on('click', function(event) {
			window.location.replace('Karta1Id.html?id='+izabranLet.id);
			//window.location.replace('Karta1.html');
			//return ;
		});
		
		
			
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
	getLet(params);
	
});