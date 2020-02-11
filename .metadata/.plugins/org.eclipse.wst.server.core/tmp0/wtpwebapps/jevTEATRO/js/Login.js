
$(document).ready(function() {



		$('#loginBtn').on('click', function(event) {

            var usernameInput = $('#usernameInput');
            var passwordInput = $('#passwordInput');

			var username = usernameInput.val();
			var password = passwordInput.val();
			console.log('username: ' + username);
			console.log('password: ' + password);		
			
			if(username==""){   
				event.preventDefault();
				return false;
			}
			if(password==""){
				event.preventDefault();
				return false;
			}
			if(username=="" && password==""){
				event.preventDefault();
				return false;
			}

			var params = {
				'username': username, 
				'password': password
            }
            

            $.post('LoginServlet', params, function(data) {
                console.log('stigao odgovor!')
                alert("doslo je do loginServleta");

				console.log(data);

				if (data.status == 'failure') {
					usernameInput.val('');
					passwordInput.val('');
					return;
                }
                
                
				if (data.status == 'success') {
					$.get('UserServlet', {'action': 'loggedInUserRole'}, function(data) {
						console.log(data);

						if (data.status == 'unauthenticated') {
							window.location.replace('Login.html');
							return;
						}

							
						if (data.loggedInUserRole == 'administrator') {
							window.location.replace('Administrator.html');
						}
						else{
							//treba bilo sta druigo al za sada nek bude ovo
							window.location.replace('Movie.html');
						}
					});

				}
			});
			
			console.log('poslat zahtev!')

			
			event.preventDefault();
			return false;


        });

  
 

});