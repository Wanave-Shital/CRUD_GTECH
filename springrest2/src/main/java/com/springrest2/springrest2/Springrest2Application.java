package com.springrest2.springrest2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan()

public class Springrest2Application {

	public static void main(String[] args) {
		SpringApplication.run(Springrest2Application.class, args);
	}

}
