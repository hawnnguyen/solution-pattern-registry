package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;
import graphql.Scalars;

@SpringBootApplication
public class PatternServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PatternServiceApplication.class, args);
    }

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> wiringBuilder
            .scalar(Scalars.GraphQLID);
    }
}
