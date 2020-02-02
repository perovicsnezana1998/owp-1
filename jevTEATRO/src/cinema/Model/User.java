package cinema.Model;

import java.util.Date;

public class User {

	public enum Role{
		korisnik,administrator
	}

	private int id;
	private String username;
	private String password;
	private Date registrationDate;
	private Role role;
	private boolean deleted;
	
	
	public User(int id, String username, String password, Date registrationDate, Role role, boolean deleted) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.registrationDate = registrationDate;
		this.role = role;
		this.deleted = false;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public Date getRegistrationDate() {
		return registrationDate;
	}


	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}
	
	


	public boolean isDeleted() {
		return deleted;
	}


	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", registrationDate="
				+ registrationDate + ", role=" + role + "]";
	}
	
	
	
	
	
	
	

}
