package cinema.Servlets;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cinema.DAO.UserDAO;
import cinema.Model.User;

/**
 * Servlet implementation class UserServlet
 */
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
  
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	
	
		User loggedInUser = (User) request.getSession().getAttribute("loggedInUser");
		if (loggedInUser == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		loggedInUser = UserDAO.get(loggedInUser.getUsername());
		if (loggedInUser == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}

		Map<String, Object> data = new LinkedHashMap<>();

		String action = request.getParameter("action");
		System.out.println(action);
		switch (action) {
			case "loggedInUserRole": {
				data.put("loggedInUserRole", loggedInUser.getRole());
				break;
			}
			case "loggedInUser":{
				data.put("loggedInUser", loggedInUser);
				break;
			}
			/*
			case "all": {
				List<User> users = UserDAO.getAll();
				data.put("users", users);
				break;
			}
			case "pojedinacni": {
				Long id = Long.parseLong(request.getParameter("id"));
				Korisnik korisnik = KorisnikDAO.get(id);
				data.put("korisnik", korisnik);
				break;
			}
			case "pojedinacniAdmin": {
				Long id = Long.parseLong(request.getParameter("id"));
				Korisnik korisnik = KorisnikDAO.getPojedinacni(id);
				data.put("korisnikPojedinacni", korisnik);
				break;
			}
			case "allAdmin": {
				List<Korisnik> korisnici = KorisnikDAO.getAllAdmin();
				data.put("korisnici", korisnici);
				break;
			}
			case "allKorisnik": {
				List<Korisnik> korisnici = KorisnikDAO.getAllKorisnik();
				data.put("korisnici", korisnici);
				break;
			}
			*/
			
		}

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
	}
	
	
	
	
	
	
	
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
