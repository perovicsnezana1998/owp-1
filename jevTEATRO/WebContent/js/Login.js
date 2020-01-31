$(document).ready(function() {

		var usernameInput = $('#usernameInput');
		var passwordInput = $('#passwordInput');

		$('#loginBtn').on('click', function(event) {
			var username = usernameInput.val();
			var password = passwordInput.val();
			console.log('korisnickoIme: ' + korisnickoIme);
			console.log('lozinka: ' + lozinka);		
			
			if(korisnickoIme==""){
				event.preventDefault();
				return false;
			}
			if(lozinka==""){
				event.preventDefault();
				return false;
			}
			if(korisnickoIme=="" && lozinka==""){
				event.preventDefault();
				return false;
			}

			var params = {
				'username': username, 
				'password': password
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