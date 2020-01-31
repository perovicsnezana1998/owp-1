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


  
	
	
	
var letoviTabela = $('#letoviTabela');
	
	function getLetovi() {
		$.get("LetServlet", {'action': 'all'}, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}

			if (data.status == 'success') {
				letoviTabela.find('tr:gt(0)').remove();

				var letoviPrikaz = data.letovi;
				letoviTabela.append('<tbody>');
				for (l in letoviPrikaz) {
					letoviTabela.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 

						'<td>' + letoviPrikaz[l].brojLeta + '</td>' + 
						'<td>' + moment(letoviPrikaz[l].datumPolaska).format('YYYY-MM-DD HH:mm') + '</td>' + 
						'<td>' + moment(letoviPrikaz[l].datumDolaska).format('YYYY-MM-DD HH:mm') + '</td>' + 
						'<td>' + letoviPrikaz[l].aerodromPolazni + '</td>' + 
						'<td>' + letoviPrikaz[l].aerodromDolazni + '</td>' + 
						'<td>' + letoviPrikaz[l].brojSedista + '</td>' + 
						'<td>' + letoviPrikaz[l].brojSlobodnihSedista + '</td>' + 
						'<td>' + letoviPrikaz[l].cenaLeta + '</td>' +

							
						'</tr>'
					)
				}
				letoviTabela.append('</tbody>');
			
				
				$("#letoviTabela").on('click','tr',function(event) {
			        console.log("let id: "+($(event.currentTarget).index()));
			        var id = letoviPrikaz[$(event.currentTarget).index()].id;
			        
			        var params = {
			    			'action': 'uzmiLetPoID',
			    			'ID':id
			    	}
			        $.get('KartaServlet', params, function(data) {
						
						if (data.status == 'unauthenticated') {
							window.location.replace('Pocetna.html');
							return;
						}
						var izabranLet = data.letPoID;
						var brojLeta=$("#brojLetaK");
				        var datum=$("#datumPolaskaK");
				        var aerodrom=$("#polazniK");
				        var ispravno=$("#ispravnoPrva")
						brojLeta.text(izabranLet.brojLeta);
				        datum.text(moment(izabranLet.datumPolaska).format('YYYY-MM-DD HH:mm'));
				        aerodrom.text(izabranLet.aerodromPolazni);
						
							
					});
			      
			        $('#povratniDugme').on('click',function(event){
			        	
			        	
			        	window.location.replace("Karta2.html?id="+id);
			        	event.preventDefault();
			    		return false;
			        });
			        $('#uJednomDugme').on('click',function(event){
			        
			        	window.location = "Karta3UJednom.html?id="+id;
			        	event.preventDefault();
			    		return false;
			        });
			        
			        
			        
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
	getLetovi();
});
//kraj document

