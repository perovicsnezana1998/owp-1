$(document).ready(function() {



    var inputUsername = $('#inputUsername');
    var inputPassword = $('#inputPassword');
    var inputPassword2 = $('#inputPassword2');

    var messageParagraph = $('#messageParagraph');


   
		
		


    $('#registrationBtn').on('click', function(event) {
        var username = inputUsername.val();
        var password = inputPassword.val();
        var password2 = inputPassword2.val();
        console.log('korisnickoIme: ' + username);
        console.log('lozinka: ' + password);
        console.log('ponovljenaLozinka: ' + password2);

        if (password != password2) {
            messageParagraph.text('Lozinke se ne podudaraju!');

            event.preventDefault();
            return false;
        }
        if(username==""){
          
            event.preventDefault();
            return false;
        }
        if(password==""){
            
            event.preventDefault();
            return false;
        }
        if(password2==""){
            
            event.preventDefault();
            return false;
        }

        
        var params = {
            'username': username, 
            'password': password
        }

        
        $.post('RegistrationServlet', params, function(data) {
            console.log(data);

            if (data.status == 'failure') {
                messageParagraph.text(data.message);
                return;
            }


            if (data.status == 'success') {
              /*  $.post('LoginServlet', params, function(data) {
                    console.log('stigao odgovor!')
                    console.log(data);

                    if (data.status == 'failure') {
                        username.val('');
                        password.val('');
                        return;
                    }
                    if (data.status == 'success') {
                        $.get('UserServlet', {'action': 'loggedInUser'}, function(data) {
                            console.log(data);

                            if (data.status == 'unauthenticated') {
                                window.location.replace('Login.html');
                                return;
                            }

                            
                            if (data.loggedInUserRole == 'user') {
                                window.location.replace('User.html');
                            }
                            
                        });

                    }
                  });
                  */

                 messageParagraph.text("uspijesnaz");
                 window.location.replace('Login.html');

            }
        });

        event.preventDefault();
        return false;
    });

});