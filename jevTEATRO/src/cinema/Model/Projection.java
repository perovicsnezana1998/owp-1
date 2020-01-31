package cinema.Model;

import java.util.Date;

public class Projection {

	private int id;
	private Movie movieId;
	private Projection projectionId;
	private Hall hallId;
	private Date date;
	private double price;
	private String adminId;
	
	
	public Projection(int id, Movie movieId, Projection projectionId, Hall hallId, Date date, double price,
			String adminId) {
		super();
		this.id = id;
		this.movieId = movieId;
		this.projectionId = projectionId;
		this.hallId = hallId;
		this.date = date;
		this.price = price;
		this.adminId = adminId;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Movie getMovieId() {
		return movieId;
	}


	public void setMovieId(Movie movieId) {
		this.movieId = movieId;
	}


	public Projection getProjectionId() {
		return projectionId;
	}


	public void setProjectionId(Projection projectionId) {
		this.projectionId = projectionId;
	}


	public Hall getHallId() {
		return hallId;
	}


	public void setHallId(Hall hallId) {
		this.hallId = hallId;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public String getAdminId() {
		return adminId;
	}


	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}


	@Override
	public String toString() {
		return "Projection [id=" + id + ", movieId=" + movieId + ", projectionId=" + projectionId + ", hallId=" + hallId
				+ ", date=" + date + ", price=" + price + ", adminId=" + adminId + "]";
	}
	
	
	
	
	
	
}
