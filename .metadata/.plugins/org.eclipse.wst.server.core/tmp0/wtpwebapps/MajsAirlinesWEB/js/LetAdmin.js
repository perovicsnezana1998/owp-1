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
	};
	$('#izmeniLet').on('click', function(event) {
		$.get('KartaServlet', params, function(data) {
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}
			if(data.status=='success'){
				var izabranLet = data.letPoID;
				console.log(izabranLet);
				console.log(izabranLet.aerodromDolazni);
				
				var brLet=$("#brojLetaL").val();
				var datPol=$("#datumPolaskaL").val();
				
				var dtumDolaska=$("#dtp7").val();
				var polazni = $('#polazniL').find(":selected").val();
				var dolazni = $('#dolazniL').find(":selected").val();
				var brSedista=$("#brojSedistaL").val();
				var brSSed=$("#brojSlobodnihSedistaL").val();
				var cenaLet=$("#cenaL").val();
				
			}
			var param = {
					'action':'update',
					'brojLeta' : brLet,
					'DD' : dtumDolaska,
					'cena' : cenaLet,
					'polazni' : polazni,
					'dolazni' : dolazni,
					'brojSlobodnih':brSSed
			};
			console.log(params);
			$.post('LetServlet', param, function(data) {
				if (data.status == 'unauthenticated') {
					window.location.replace('Pocetna.html');
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
			event.preventDefault();
			return false;
	});
		
	//izmenilet kraj		
});
	function getLet(params){
		$.get('KartaServlet', params, function(data) {
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}
			if(data.status=='success'){
				var izabranLet = data.letPoID;
				console.log(izabranLet);
				console.log(izabranLet.aerodromDolazni);
				
				$("#brojLetaL").val(izabranLet.brojLeta);
				$("#datumPolaskaL").val(moment(izabranLet.datumPolaska).format('YYYY-MM-DD HH:mm'));
				$("#dtp7").val(moment(izabranLet.datumDolaska).format('YYYY-MM-DD HH:mm'));
				$("#polazniL").val(izabranLet.aerodromPolazni);
				$("#dolazniL").val(izabranLet.aerodromDolazni);
				$("#brojSedistaL").val(izabranLet.brojSedista);
				$("#brojSlobodnihSedistaL").val(izabranLet.brojSlobodnihSedista);
				$("#cenaL").val(izabranLet.cenaLeta);
				
			}
			
			
			
			$('#kupiRezervisiKartuSaLeta').on('click', function(event) {
				window.location.replace('Karta1Id.html?id='+izabranLet.id);
				//window.location.replace('Karta1.html');
				//return ;
			});
			$('#obrisiLet').on('click', function(event) {
				$('#modalObrisi').modal('show');
				$('#btnOKI').on('click', function(event) {
				params = {
						'action': 'delete',
						'id': id
					};
					console.log(params);
				$.post('LetServlet', params, function(data) {
					
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
			});

			
			
			

			
			//funkcija zavrsetak
			
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
	var par = {
			'action': 'letKartaRezervisane',
			'id':id
	};
	var par1 = {
			'action': 'letKartaKupljene',
			'id':id
	};
var letoviKartaTabela = $('#kartaLetTabelaAdmin');
var letoviKartaKupljeneTabele=$('#kartaLetTabelaAdminKupljene')


	function getLetoviKartaAdmin() {
		$.get("KartaServlet",par, function(data) {
			console.log(data);

			if (data.status == 'unauthenticated') {
				window.location.replace('Pocetna.html');
				return;
			}

			if (data.status == 'success') {
				letoviKartaTabela.find('tr:gt(0)').remove();

				var letoviPrikaz = data.karteLetAdmin;
				letoviKartaTabela.append('<tbody>');
				for (l in letoviPrikaz) {
					if(letoviPrikaz[l].polazniLetId==id){
					letoviKartaTabela.append(
						'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
							'<td>' + moment(letoviPrikaz[l].datumRezervacije).format('YYYY-MM-DD HH:mm') + '</td>' + 
							'<td>' + letoviPrikaz[l].ime + '</td>'+
							'<td>' + letoviPrikaz[l].sedidteNaPolaznomLetu + '</td>'+
							//'<td>' + letoviPrikaz[l].sedidteNaPovratnomLetu + '</td>'+
						'</tr>'
					)
					}
					else{
						letoviKartaTabela.append(
								'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
									'<td>' + moment(letoviPrikaz[l].datumRezervacije).format('YYYY-MM-DD HH:mm') + '</td>' + 
									'<td>' + letoviPrikaz[l].ime + '</td>'+
									//'<td>' + letoviPrikaz[l].sedidteNaPolaznomLetu + '</td>'+
									'<td>' + letoviPrikaz[l].sedidteNaPovratnomLetu + '</td>'+
								'</tr>'
							)
					}
				}
				letoviKartaTabela.append('</tbody>');
				$(".clickable-row").on('click',function(event) {
				
					var id = letoviPrikaz[$(event.currentTarget).index()].id;
					console.log(id);
					window.location = "KartaPrikaz.html?id="+id;
					
			        
			        
			    });
				
			}
		});
	}

function getLetoviKartaAdminKupljene() {
	$.get("KartaServlet",par1, function(data) {
		console.log(data);

		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}

		if (data.status == 'success') {
			letoviKartaKupljeneTabele.find('tr:gt(0)').remove();

			var letoviPrikaz = data.karteLetAdminKupljene;
			letoviKartaKupljeneTabele.append('<tbody>');
			for (l in letoviPrikaz) {
				console.log(letoviPrikaz[l].polazniLetId+"polazni"+id);
				if(letoviPrikaz[l].polazniLetId==id){
					console.log(letoviPrikaz[l].polazniLetId+"polazni"+id);
					letoviKartaKupljeneTabele.append(
					'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
						'<td>' + moment(letoviPrikaz[l].datumProdajeKarte).format('YYYY-MM-DD HH:mm') + '</td>' + 
						'<td>' + letoviPrikaz[l].ime + '</td>'+
						'<td>' + letoviPrikaz[l].sedidteNaPolaznomLetu + '</td>'+
					'</tr>'
				)
				}
				else{
					letoviKartaKupljeneTabele.append(
							'<tr class=\'clickable-row\' data-href=\'url://\'>' + 
								'<td>' + moment(letoviPrikaz[l].datumProdajeKarte).format('YYYY-MM-DD HH:mm') + '</td>' + 
								'<td>' + letoviPrikaz[l].ime + '</td>'+
								//'<td>' + letoviPrikaz[l].sedidteNaPolaznomLetu + '</td>'+
								'<td>' + letoviPrikaz[l].sedidteNaPovratnomLetu + '</td>'+
							'</tr>'
						)
				}
			}
			letoviKartaKupljeneTabele.append('</tbody>');
			$(".clickable-row").on('click',function(event) {
			
				
				var id = letoviPrikaz[$(event.currentTarget).index()].id;
				console.log(id);
				window.location = "KartaPrikaz.html?id="+id;
		        
		        
		    });
			
		}
	});
}

	getUlogovani();
	getLet(params);
	getLetoviKartaAdmin();
	getLetoviKartaAdminKupljene();


	
});