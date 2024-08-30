package com.example.demo.repository;

import com.example.demo.entity.DbEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DbEntityRepository extends JpaRepository<DbEntity, Long> {
    // 추가적인 쿼리 메서드 정의 가능
}
