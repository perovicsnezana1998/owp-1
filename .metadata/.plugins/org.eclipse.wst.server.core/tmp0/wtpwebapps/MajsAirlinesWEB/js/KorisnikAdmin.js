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
	//function getKorisnik(){
		var params = {
		'action': 'pojedinacniAdmin',
		'id': id
	};
		$.get('KorisnikServlet', params, function(data) {
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}
			console.log(data);
			var korisnikIzabrani = data.korisnikPojedinacni;
			
			console.log("korime "+korisnikIzabrani.korisnickoIme);
			console.log(korisnikIzabrani.blokiran);
			console.log(korisnikIzabrani.datumRegistracije);
			var korisnickoImeUnos = $('#korImeAdmin');
			var lozinkaUnos = $('#lozinkaAdmin');	
			var datumReg=$("datumRegistracijeAdmin");
			var strKorisnik = $("#uloga");
			var strKorisnikBlok = $("#blokiran");
			var id = korisnikIzabrani.id;
			$('#datumRegistracijeAdmin').text(moment(korisnikIzabrani.datumRegistracije).format('YYYY-MM-DD HH:mm'))
			korisnickoImeUnos.val(korisnikIzabrani.korisnickoIme);
			lozinkaUnos.val(korisnikIzabrani.lozinka);
			strKorisnik.val(korisnikIzabrani.uloga);
			strKorisnikBlok.prop(korisnikIzabrani.blokiran);
			console.log
			
			$('#izmeniKorisnika').on('click', function(event) {
				if(korisnikIzabrani.obrisan==true){
					$("#modalIzmeni").modal('show');
					event.preventDefault();
					return false;
				}
				
				var korisnickoIme = korisnickoImeUnos.val();
				var lozinka = lozinkaUnos.val();
				var strKorisnik1 = $('#uloga').find(":selected").val();
				console.log(strKorisnik1);
				var strKorisnikBlok1 = $('#blokiran').find(":selected").val();
				console.log(strKorisnikBlok1);
				var id = korisnikIzabrani.id;
				console.log('id: ' + id);
				console.log('korisnickoIme: ' + korisnickoIme);
				console.log('lozinka: ' + lozinka);
				console.log('strKorisnik: ' + strKorisnik1);
				console.log('strKorisnikBlok: ' + strKorisnikBlok1);
				params = {
					'action': 'updateAdmin',
					'id': id, 
					'korisnickoIme': korisnickoIme, 
					'lozinka': lozinka,
					'strKorisnik': strKorisnik1,
					'strKorisnikBlok': strKorisnikBlok1,
				};
				console.log(params);
				
				$.post('KorisnikServlet', params, function(data) {
					if (data.status == 'unauthenticated') {
						window.location.replace('Pocetna.html');
						return;
					}

					if (data.status == 'success') {
						window.location.replace('Administrator.html');
						return;
					}
				});

				event.preventDefault();
				return false;
				
			
			});
			$('#obrisiKorisnika').on('click', function(event) {
				if(korisnikIzabrani.obrisan==true){
					$("#modalIzmeni").modal('show');
					event.preventDefault();
					return false;
				}
				
				else{
					$('#modalObrisi').modal('show');
					$('#btnOKI').on('click', function(event) {
				params = {
						'action': 'delete',
						'id': id
					};
					console.log(params);
				$.post('KorisnikServlet', params, function(data) {
					
					if (data.status == 'unauthenticated') {
						window.location.replace('Pocetna.html');
						return;
					}

					if (data.status == 'success') {
						window.location.replace('Administrator.html');
						return;
					}
				});
				
					});
				
				}
				
				
			});
				
			
				
		});
		
	//}
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
	//getKorisnik();

});