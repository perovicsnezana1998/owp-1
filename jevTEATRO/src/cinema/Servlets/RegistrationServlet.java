package cinema.Servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cinema.DAO.UserDAO;
import cinema.Model.User;
import cinema.Model.User.Role;
import javafx.util.converter.LocalDateStringConverter;

/**
 * Servlet implementation class RegistrationServlet
 */
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegistrationServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			String username = request.getParameter("username");
			if (UserDAO.get(username) != null)
				throw new Exception("Username already exsists!");
			if ("".equals(username))
				throw new Exception("Username is empty!");

			String password = request.getParameter("password");
			if ("".equals(password))
				throw new Exception("Password is empty!");

			
			java.util.Date registrationDate=new java.util.Date();
		//	SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		//////  =Date.parse(formatter.format(date));
			Boolean deleted = false;
			
			
		
			User user =  new User(username, password, registrationDate, Role.user, deleted);
			System.out.println(user);
			
			UserDAO.add(user);


			request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		} catch (Exception ex) {
			String message = ex.getMessage();
			if (message == null) {
				message = "Some NEPREDVIDJENA greska!";
				ex.printStackTrace();
			}

			Map<String, Object> data = new LinkedHashMap<>();
			data.put("message", message);

			request.setAttribute("data", data);
			request.getRequestDispatcher("./FailureServlet").forward(request, response);
		}
	}

}