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
	if(window.location.search.slice(1).split('&').length>1){
		var idP = window.location.search.slice(1).split('&')[1].split('=')[1];
	}
	console.log("id"+id);
	console.log("idP: "+idP);
	var params = {
			'action': 'uzmiLetPoID',
			'ID':id
	      };
		getSelectedLetById(params);
		

			

	var paramPovratni = {
				'action': 'uzmiLetPoID',
				'ID':idP
		      };
	getSelectedLetByIdPovratni(paramPovratni);
	

	//function getSedistaPolazni(){
		var paramsPolazni = {"action": "polazniSedista","letIdPol": id};
		
		console.log(paramsPolazni)
		$.get('KartaServlet', paramsPolazni, function(data){
			console.log(paramsPolazni)
			var polazniSedista = data.sedistaPolazni1;
			var a=0;
			
			console.log(polazniSedista);
			
			
			var text = "";
			text += "Polazni: <br>";
	        var i = 0;
	       
	        
	        while(i < 60){
	            text += "<div class=\"row\"><p>";
	            for(var j = i; j < i+6; j++){
	            	var temp = false;
	            	for(var k = 0; k < polazniSedista.length; k++){
	            		if(polazniSedista[k] == (j+1)){
	            			temp = true;
	            			break;
	            		}
	            	}
	                if(j<i+3){
	                	if(temp == true){
	                		text += (j+1)+"<input id=\"brojPolazni\" data-broj=" +j+" type=\"checkbox\" disabled=\"disabled\" checked=\"checked\">&nbsp";
	                	}else{
	    	             text += (j+1)+"<input id=\"brojPolazni"  + j +"\" data-broj="+j+" onclick=\"sedistePolazniClick("+j+")\" type=\"checkbox\">&nbsp";
	    	             console.log(j);
	                	}
        		
               
	                }
	                if(j>i+2){
	                	if(temp == true){
	                		text += (j+1)+"<input id=\"brojPolazni\" data-broj=" +j+" type=\"checkbox\" disabled=\"disabled\" checked=\"checked\">&nbsp";
	                	}else{
	                    text += (j+1)+"<input id=\"brojPolazni"  + j +"\" data-broj="+j+" onclick=\"sedistePolazniClick("+j+")\" type=\"checkbox\">&nbsp";
	                    console.log(j);
	                	}
	                }
	                
	                if(j==i+2){
	                    text += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
	                }
	            
	          }
	            i+=6;
	            text+="</p></div>"
	        }
	        document.getElementById("sedistaPolazni").innerHTML = text;
	        
		});
	//}
	

	//function getSedistaPovratni(){
		var paramsPovratni = {"action": "povratniSedista","letIdPol": idP};
		
		console.log(paramsPovratni)
		$.get('KartaServlet', paramsPovratni, function(data){
			var povratniSedista = data.sedistaPovratni;
			
			
			console.log(povratniSedista);
			
			
			var text = "";
			text += "Povratni: <br>";
	        var i = 0;
	       
	        
	        while(i < 60){
	            text += "<div class=\"row\"><p>";
	            for(var j = i; j < i+6; j++){
	            	var temp = false;
	            	for(var k = 0; k < povratniSedista.length; k++){
	            		if(povratniSedista[k] == (j+1)){
	            			temp = true;
	            			break;
	            		}
	            	}
	                if(j<i+3){
	                	if(temp == true){
	                		text += (j+1)+"<input id=\"brojPovratni\" data-broj=" +j+" type=\"checkbox\" disabled=\"disabled\" checked=\"checked\">&nbsp";
	                	}else{
	    	             text += (j+1)+"<input id=\"brojPovratni"  + j +"\" data-broj="+j+" onclick=\"sedistePovratniClick("+j+")\" type=\"checkbox\">&nbsp";
	    	             console.log(j);
	                	}
        		
               
	                }
	                if(j>i+2){
	                	if(temp == true){
	                		text += (j+1)+"<input id=\"brojPovratni\" data-broj=" +j+" type=\"checkbox\" disabled=\"disabled\" checked=\"checked\">&nbsp";
	                	}else{
	                    text += (j+1)+"<input id=\"brojPovratni"  + j +"\" data-broj="+j+" onclick=\"sedistePovratniClick("+j+")\" type=\"checkbox\">&nbsp";
	                    console.log(j);
	                	}
	                }
	                
	                if(j==i+2){
	                    text += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
	                }
	            
	          }
	            i+=6;
	            text+="</p></div>"
	        }
	        document.getElementById("sedistaPovratni").innerHTML = text;
	        
		});
       
	//}

	function getUlogovani(){
		$.get('KorisnikServlet', {'action': 'ulogovaniKorisnik'}, function(data) {
			console.log("usao");
			
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
	
	$('#rezervisiDugme').on('click', function(event) {
		
		
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
			
			
				
				
		
		var paramsKarta = {
				"action" : "rezervisi",
				"polazniLetId" : id,
				"povratniLetId" : idP,
				"polaznoSedisteId" : polaznoSediste,
				"povratnoSedisteId" : povratnoSediste,
				"korisnikId" : korisnikId,
				"korisnikIme" : $("#ime").val(),
				"korisnikPrezime" : $("#prezime").val()
				};
		console.log(paramsKarta)
		$.post('KartaServlet', paramsKarta, function(data){
			if (data.status == 'failure') {
				window.location.replace('Pocetna.html');
				return;
			}
			if (data.status == 'success') {
				
				
				
				$.get('KorisnikServlet', {'action': 'ulogovaniKorisnikUloga'}, function(data) {
					console.log(data);

					if (data.status == 'unauthenticated') {
						window.location.replace('Prijava.html');
						return;
					}

						
						if (data.ulogovaniKorisnikUloga == 'ADMIN') {
							window.location.replace('Administrator.html');
							return;
						}
						else{
							window.location.replace('Korisnik.html');
							return;
						}
				});
			}
		});
		event.preventDefault();
		return false;
	});
	});
	$('#kupiDugme').on('click', function(event) {
		
		console.log(polaznoSediste);
		//console.log(povratnoSediste);
		
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
			
			
				
				
		
		var paramsKarta = {
				"action" : "kupi",
				"polazniLetId" : id,
				"povratniLetId" : idP,
				"polaznoSedisteId" : polaznoSediste,
				"povratnoSedisteId" : povratnoSediste,
				"korisnikId" : korisnikId,
				"korisnikIme" : $("#ime").val(),
				"korisnikPrezime" : $("#prezime").val()
				};
		console.log(paramsKarta)
		$.post('KartaServlet', paramsKarta, function(data){
			if (data.status == 'failure') {
				window.location.replace('Pocetna.html');
				return;
			}
			if (data.status == 'success') {
				
				
				$.get('KorisnikServlet', {'action': 'ulogovaniKorisnikUloga'}, function(data) {
					console.log(data);

					if (data.status == 'unauthenticated') {
						window.location.replace('Prijava.html');
						return;
					}

						
						if (data.ulogovaniKorisnikUloga == 'ADMIN') {
							window.location.replace('Administrator.html');
							return;
						}
						else{
							window.location.replace('Korisnik.html');
							return;
						}
				});
				
				
			}
		});
		event.preventDefault();
		return false;
	});
	});

getUlogovani();

//getSedistaPolazni();
//getSedistaPovratni();

});

var otkacenPovratni = "";
var otkacenPolazni = "";

function sedistePolazniClick(id){
	var praviId = "brojPolazni"+id;
	if(otkacenPolazni == true && document.getElementById(praviId).checked == true){
		alert("Vec ste izabrali jedno sediste!");
		document.getElementById(praviId).checked = false;
		return;
	}
	if(document.getElementById(praviId).checked == false){
		otkacenPolazni = false;
		
	}else{
		otkacenPolazni = true;
		polaznoSediste = id;
		//polaznoSediste = praviId.substring(11, praviId.length);
		console.log(polaznoSediste);
	}
	console.log("Kliknut"+praviId);
	console.log("usao");
}
function sedistePovratniClick(id){
	var praviId = "brojPovratni"+id;
	if(otkacenPovratni == true && document.getElementById(praviId).checked == true){
		alert("Vec ste izabrali jedno sediste!");
		document.getElementById(praviId).checked = false;
		return;
	}
	if(document.getElementById(praviId).checked == false){
		otkacenPovratni = false;
		
	}else{
		otkacenPovratni = true;
		povratnoSediste = id;
		console.log(povratnoSediste);
	}
	console.log("Kliknut: "+praviId);
	console.log("usao");
}
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
function getSelectedLetByIdPovratni(paramPovratni){
	$.get('KartaServlet', paramPovratni, function(data) {
		
		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}
		var izabranLet = data.letPoID;
		var brojLeta=$("#brojLetaK2");
        var datum=$("#datumDolaskaK2");
        var aerodrom=$("#dolazniK2");
        
		brojLeta.text(izabranLet.brojLeta);
        datum.text(moment(izabranLet.datumDolaska).format('YYYY-MM-DD HH:mm'));
        aerodrom.text(izabranLet.aerodromDolazni);
		
			
	});

	}
function getCena(paramCena){
	$.get('KartaServlet', paramCena, function(data) {
		
		if (data.status == 'unauthenticated') {
			window.location.replace('Pocetna.html');
			return;
		}
		var cena=data.ukupnaCena;
		console.log(cena+"cenaukupna")
		var cenaKarte=$('#cenaUnos').val(cena);
		
		
			
	});
}