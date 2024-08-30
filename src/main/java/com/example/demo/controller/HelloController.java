package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")  // React 앱이 실행 중인 주소
@RestController
public class HelloController {

    @GetMapping("/api/test")
    public String hello() {
        return "바보입니다.";
    }
}