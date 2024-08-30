package com.example.demo.service;

import com.example.demo.entity.DbEntity;
import com.example.demo.repository.DbEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
public class DbEntityService {

    @Autowired
    private DbEntityRepository repository;

    public List<DbEntity> getAllEntities() {
        return repository.findAll();
    }

    public DbEntity saveEntity(DbEntity entity) {
        return repository.save(entity);
    }

    // 추가적인 서비스 메서드 구현
}
