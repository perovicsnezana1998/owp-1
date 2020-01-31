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
	
	
	var id1 = window.location.search.slice(1).split('&')[0].split('=')[1];
	console.log(id1);

		var params = {
		'action': 'uzmiLetPoID',
		'ID':id1
      };
	getSelectedLetById(params);
  
	
	$('#povratniDugme').on('click',function(event){
    	
        	window.location.replace("Karta2.html?id="+id1);
        	event.preventDefault();
    		return false;
        
    	
    	
    });
	$('#uJednomDugme').on('click',function(event){
    	
        	window.location = "Karta3UJednom.html?id="+id1;
        	event.preventDefault();
    		return false;
       
    
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
			var korisnikId=korisnik.id
			console.log(korisnikId);
			
			$('#odustaniKarta').on('click',function(event){
				if(korisnik.uloga=="KORISNIK"){
					window.location = "Korisnik.html";
					return;
				}
				if(korisnik.uloga=="ADMIN"){
					window.location = "Administrator.html";
					return;
				}
	        	
	        	
	        });
			
				
				
		});
		
	}

	getUlogovani();
	
});


function getSelectedLetById(params){
$.get('KartaServlet', params, function(data) {
	
	if (data.status == 'unauthenticated') {
		window.location.replace('Pocetna.html');
		return;
	}
	var izabranLet = data.letPoID;
	$("#brojLetaK").text(izabranLet.brojLeta);
	$("#datumPolaskaK").text(moment(izabranLet.datumPolaska).format('YYYY-MM-DD HH:mm'));
	$("#polazniK").text(izabranLet.aerodromPolazni);
	
		
});

}