package cinema.Servlets;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import cinema.DAO.ConnectionManager;



/**
 * Application Lifecycle Listener implementation class InitListener
 *
 */
public class InitListener implements ServletContextListener {

    /**
     * Default constructor. 
     */
    public InitListener() {
        // TODO Auto-generated constructor stub
    }

	/**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent)
     */
    public void contextDestroyed(ServletContextEvent sce)  { 
         // TODO Auto-generated method stub
    }

	/**
     * @see ServletContextListener#contextInitialized(ServletContextEvent)
     */
    public void contextInitialized(ServletContextEvent sce)  { 
    	System.out.println("Inicijalizacija");
    	ConnectionManager.open();
    	System.out.println("Zavrseno");
    }
	
}
