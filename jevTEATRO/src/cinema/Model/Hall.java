package cinema.Model;

public class Hall {
	
	private int id;
	private String name;
	private ProjectionType projectionType;
	private int seatNumber;
	
	
	public Hall(int id, String name, ProjectionType projectionType, int seatNumber) {
		super();
		this.id = id;
		this.name = name;
		this.projectionType = projectionType;
		this.seatNumber = seatNumber;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public ProjectionType getProjectionType() {
		return projectionType;
	}


	public void setProjectionType(ProjectionType projectionType) {
		this.projectionType = projectionType;
	}


	public int getSeatNumber() {
		return seatNumber;
	}


	public void setSeatNumber(int seatNumber) {
		this.seatNumber = seatNumber;
	}


	@Override
	public String toString() {
		return "Hall [id=" + id + ", name=" + name + ", projectionType=" + projectionType + ", seatNumber=" + seatNumber
				+ "]";
	}
	
	

	
	
}
