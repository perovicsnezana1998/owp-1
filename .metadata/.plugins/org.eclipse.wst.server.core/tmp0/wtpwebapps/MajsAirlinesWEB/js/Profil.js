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
	
	
	function getUlogovani(){
		$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}
			console.log(data);
			var korisnik = data.ulogovaniKorisnik;
			console.log(korisnik);
			var korisnickoImeUnos = $('#korisnickoImeUnos');
			var lozinkaUnos = $('#lozinkaUnos');	
			var id = korisnik.id;
			korisnickoImeUnos.val(korisnik.korisnickoIme);
			lozinkaUnos.val(korisnik.lozinka);
			console.log(korisnik.blokiran);
			$('#updateSubmitProfil').on('click', function(event) {
				var korisnickoIme = korisnickoImeUnos.val();
				var lozinka = lozinkaUnos.val();
				var id = korisnik.id;
				var porukaKorIme=$("#korisnikKorImePoruka");
				var porukaLozinka=$("#korisnikPasswordPoruka");
				var blokiranPor=$("#blokiranPoruka");
				console.log('id: ' + id);
				console.log('korisnickoIme: ' + korisnickoIme);
				console.log('lozinka: ' + lozinka);
				if(korisnickoIme==""){
					porukaKorIme.text("Niste umeli korisnicko ime");
					event.preventDefault();
					return false;
				}
				if(lozinka==""){
					porukaLozinka.text("Niste umeli lozinku");
					event.preventDefault();
					return false;
				}
				if(korisnik.blokiran==true){
					porukaLozinka.text("Nemate mogucnost da menjate profil");
					event.preventDefault();
					return false;
				}
				params = {
					'action': 'update',
					'id': id, 
					'korisnickoIme': korisnickoIme, 
					'lozinka': lozinka
				};
				console.log(params);
				$.post('KorisnikServlet', params, function(data) {
					if (data.status == 'success') {
						window.location.replace('Pocetna.html');
						return;
					}

				});

				event.preventDefault();
				return false;
			});
			
			
				
				
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
});