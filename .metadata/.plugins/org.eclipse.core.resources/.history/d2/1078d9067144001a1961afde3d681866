package cinema.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Date;

import cinema.Model.User;

public class UserDAO {
	
	
	public static User get(String username,String password) {
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset=null;
		try {
			String query = "SELECT Id,RegistrationDate,Role WHERE Username=? AND Password=? AND Deleted=?;";
			
			pstmt=conn.prepareStatement(query);
			int index = 1;
			
			pstmt.setString(index ++, username);
			pstmt.setString(index ++, password);
			Boolean deleted = false;
			pstmt.setBoolean(index ++, deleted);
			System.out.println(pstmt);
			rset=pstmt.executeQuery();
			if(rset.next()) {
				int id = rset.getInt(1);
				Date RegistrationDate=rset.getDate(2);
				System.out.println(RegistrationDate);
				User.Role role = User.Role.valueOf(rset.getString(3));
				System.out.println(role);
				return new User(id,username,password,RegistrationDate,role,deleted);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();} 
			
		}
				
		return null;
	}
	
	

}
