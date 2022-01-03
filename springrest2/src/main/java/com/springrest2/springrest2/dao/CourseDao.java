package com.springrest2.springrest2.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springrest2.springrest2.entities.Course;

public interface CourseDao extends JpaRepository<Course,Long>{
	}
