

package com.springrest2.springrest2;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.stereotype.Component;
// org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springrest2.springrest2.entities.Course;
import com.springrest2.springrest2.services.CourseService;


@RestController

@CrossOrigin(origins="http://localhost:3333")
public class MyController {
	@Autowired

	private CourseService courseService;
	
	@RequestMapping("/")
	public String index()
	{
		return "index";
	}
	

	@GetMapping("/home")
	public String home() {
		return "Welcome to Regestration Form";
	}

	
	// get the course
	//@GetMapping("/courses")
	@RequestMapping(value = "/courses", method = RequestMethod.GET)
	@ResponseBody
	public List<Course> getCourses() {
		return this.courseService.getCourses();

	}
	

	@GetMapping("/courses/{courseId}")
	public Course getCourse(@PathVariable String courseId) {

		return this.courseService.getCourse(Long.parseLong(courseId));

	}
	
	

	// add course
	@PostMapping("/courses")

	public Course addCourse(@RequestBody Course course) {
		return this.courseService.addCourse(course);
	}

	// update course using put request
	@PutMapping("/courses")
	public Course updateCourse(@RequestBody Course course) {
		return this.courseService.updateCourse(course);
	}

	// delete the course
	@DeleteMapping("/courses/{courseId}")
	public ResponseEntity<HttpStatus> deleteCourse(@PathVariable String courseId) {
		try {
			this.courseService.deleteCourse(Long.parseLong(courseId));

			return new ResponseEntity<>(HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

