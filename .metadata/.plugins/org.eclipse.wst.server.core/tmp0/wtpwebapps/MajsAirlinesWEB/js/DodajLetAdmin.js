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
	
	var polaziA = $('#polazniL');
	var dolazniA = $('#dolazniL');
	var dtp6 = $('#dtp6');
	var dtp7 = $('#dtp7');
	var cenaL = $('#cenaL');
	var brojLetaL = $('#brojLetaL');
	
	
	
	$('#dodaj').on('click', function(event) {
		var brojLeta = brojLetaL.val();
		var DP = dtp6.val();
		var DD = dtp7.val();
		var cena = cenaL.val();
		var polazni = $('#polazniL').find(":selected").val();
		var dolazni = $('#dolazniL').find(":selected").val();
		var messageBrLeta = $('#messageBrLeta');
		var messageDP = $('#messageDP');
		var messageDD = $('#messageDD');
		var messagePA = $('#messagePA');
		var messageDA = $('#messageDA');
		var messageCena = $('#messageCena');
		if (cena=="" || dolazni=="" || polazni=="" || DD=="" || DP=="" ||brojLeta=="") {
			messageCena.text('Podaci moraju biti popunjeni');

			event.preventDefault();
			return false;
		}
		if (!cena.match(/[-.0-9]+/)) {
			messageCena.text('Cena mora biti broj');

			event.preventDefault();
			return false;
		}
//		if (dolazni=="") {
//			messageDA.text('Dolazni aerodom mora biti unet');
//
//			event.preventDefault();
//			return false;
//		}
//		if (polazni=="") {
//			messagePA.text('Polazni aerodom mora biti unet');
//
//			event.preventDefault();
//			return false;
//		}
//		if (DD=="") {
//			messageDD.text('Datum dolaska mora biti unet');
//
//			event.preventDefault();
//			return false;
//		}
//		if (DP=="") {
//			messageDP.text('Datum polaska mora biti unet');
//
//			event.preventDefault();
//			return false;
//		}
//		if (brojLeta=="") {
//			messageBrLeta.text('Broj leta ne moze biti prazan');
//
//			event.preventDefault();
//			return false;
//		}
		var par = {
				'action':'uzmiLetPoBroju',
				'brojLeta' : brojLeta
		};
		$.get('LetServlet',par,function(data){
			var letDobijeni=data.letPoBroju;
			if(brojLeta==letDobijeni.brojLeta){
				messageBrLeta.text('Let sa tim brojem postoji');

				event.preventDefault();
				return false;
				
			}
			
		});
		var params = {
				'action':'add',
				'brojLeta' : brojLeta,
				'DP' : DP,
				'DD' : DD,
				'cena' : cena,
				'polazni' : polazni,
				'dolazni' : dolazni
		};
		console.log(params);
		$.post('LetServlet', params, function(data) {
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
		}
				if(data.status=='success'){
				
					window.location.replace('Administrator.html');
					return;
				
			}
				if (data.status == 'failure') {
					window.location.replace('Pocetna.html');
					return;
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
			var korisnickoIme = korisnik.korisnickoIme;
			$("#userSpan").text(korisnickoIme.toUpperCase());
			
			console.log(korisnickoIme);
			
			
				
				
		});
		
	}
	getUlogovani();
	//dodajLetAdmin();
	
});