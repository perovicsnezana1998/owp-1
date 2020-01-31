package cinema.DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;





public class ConnectionManager {
	private static final String DATABASE_NAME = "cinema.db";
	private static final String FILE_SEPERATOR = System.getProperty("file.seperator");

	private static final String WINDOWS_PATH = "C:" + FILE_SEPERATOR + "Baza" + FILE_SEPERATOR + DATABASE_NAME;
	
	//private static final String LINUX_PATH = "SQLite" + FILE_SEPERATOR + DATABASE_NAME;
	
	
	private static final String PATH = WINDOWS_PATH;
	
	private static Connection connection;
	
	public static void open() {
		try {
			Class.forName("org.sqlite.JDBC");
			connection = DriverManager.getConnection("jdcb:sqlite" + PATH);	
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	public static Connection getConnection(){
		return connection;
	}
	
	public static void close() {
		try {
			connection.close();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	

}
