package cinema.Model;

import java.util.ArrayList;

public class Movie {
	
	private enum Genre{
		horror,triler,action
	}
	
	
	private int id;
	private String name;
	private String director;
	private ArrayList<String> actors;
	private Genre genre;
	private int duration;
	private String distributer;
	private String Country;
	private int year;
	private String description;
	
	

}
