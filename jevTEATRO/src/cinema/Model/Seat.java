package cinema.Model;

public class Seat {
	
	private int id;
	private Hall hallId;
	private Projection projectionId;
	
	
	
	public Seat(int id, Hall hallId, Projection projectionId) {
		super();
		this.id = id;
		this.hallId = hallId;
		this.projectionId = projectionId;
	}



	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public Hall getHallId() {
		return hallId;
	}



	public void setHallId(Hall hallId) {
		this.hallId = hallId;
	}



	public Projection getProjectionId() {
		return projectionId;
	}



	public void setProjectionId(Projection projectionId) {
		this.projectionId = projectionId;
	}



	@Override
	public String toString() {
		return "Seat [id=" + id + ", hallId=" + hallId + ", projectionId=" + projectionId + "]";
	}
	
	
	

}
