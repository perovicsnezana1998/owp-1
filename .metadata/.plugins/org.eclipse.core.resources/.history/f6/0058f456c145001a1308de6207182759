package cinema.Servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cinema.DAO.UserDAO;
import cinema.Model.User;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
  

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		
		if(username.equals("")||password.equals("")) {
			request.getRequestDispatcher("./FailureServlet").forward(request, response);
			
			return;
		}
		if(username.equals("")&&password.equals("")) {
			request.getRequestDispatcher("./FailureServlet").forward(request, response);
			
			return;
		}
		
		
		
		
		
		
		User user = UserDAO.get(username, password);
		if(user==null) {
			
			request.getRequestDispatcher("./FailureServlet").forward(request, response);
	
			return;
		}
		request.getSession().setAttribute("loggedInUser", user);

		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		return;
		
	}

}
