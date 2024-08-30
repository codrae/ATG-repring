package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.demo.entity.*;
import com.example.demo.service.*;

@RestController
public class DbEntityController {

    @Autowired
    private DbEntityService service;

    @GetMapping("/entities")
    public List<DbEntity> getAllEntities() {
        return service.getAllEntities();
    }

    @PostMapping("/entities")
    public DbEntity createEntity(@RequestBody DbEntity entity) {
        return service.saveEntity(entity);
    }
}
