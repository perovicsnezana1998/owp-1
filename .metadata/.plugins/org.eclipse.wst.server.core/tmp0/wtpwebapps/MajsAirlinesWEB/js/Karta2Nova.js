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
	var id = window.location.search.slice(1).split('&')[0].split('=')[1];
	
	var params = {
			'action': 'uzmiLetPoID',
			'ID':id
	      };
		getSelectedLetById(params);
	
//	$('#povratakPovratniDugme').on('click',function(event){
//    	
//    	window.location.replace("Karta1Id.html?id="+id);
//    	event.preventDefault();
//		return false;
//    });
	
	var letoviPovratniTabela = $('#letoviPovratniTabela');
	var params1 = {
			'action': 'povratni',
			'ID':id
	};
		function getLetoviPovratini(){
			
			$.get("KartaServlet",params1, function(data) {
				console.log(data);

				if (data.status == 'unauthenticated') {
					window.location.replace('Pocetna.html');
					return;
				}

				if (data.status == 'success') {
					
					letoviPovratniTabela.find('tr:gt(0)').remove();
					var letoviPrikaz = data.povratni;
					letoviPovratniTabela.append('<tbody>');
					for (l in letoviPrikaz) {
						letoviPovratniTabela.append(
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
					letoviPovratniTabela.append('</tbody>');
					$("#letoviPovratniTabela").on('click','tr',function(event) {
				        console.log("let id: "+($(event.currentTarget).index()));
				        idP = letoviPrikaz[$(event.currentTarget).index()].id;
				        console.log(idP);
				        var params2 = {
				    			'action': 'uzmiLetPoID',
				    			'ID':idP
				    	}
				        $.get('KartaServlet', params2, function(data) {
							
							if (data.status == 'unauthenticated') {
								window.location.replace('Pocetna.html');
								return;
							}
							var izabranLet = data.letPoID;
							var brojLeta=$("#brojLetaK2");
					        var datum=$("#datumDolaskaK2");
					        var aerodrom=$("#dolazniK2");
					        var ispravno=$("#ispravnoPrva")
							brojLeta.text(izabranLet.brojLeta);
					        datum.text(moment(izabranLet.datumDolaska).format('YYYY-MM-DD HH:mm'));
					        aerodrom.text(izabranLet.aerodromDolazni);
							
								
						});
				        $('#sledeciPovratniDugme').on('click',function(event){
				        	
				        	window.location.replace("Karta3.html?id="+id+"&idP="+idP);
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
			$('#povratakPovratniDugme').on('click',function(event){
				if(korisnik.uloga=="KORISNIK"){
					window.location.replace("Karta1Id.html?id="+id);
			    	
					return ;
				}
				if(korisnik.uloga=="ADMIN"){
					window.location.replace("Karta1Id.html?id="+id);
			    	
					return;
				}
		    	
		    	
		    });
			
			
				
				
		});
		
	}
	getUlogovani();
	getLetoviPovratini();
});
//kraj document
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
