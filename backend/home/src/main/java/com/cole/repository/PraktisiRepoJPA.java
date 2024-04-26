package com.cole.repository;

import com.cole.vo.Praktisi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PraktisiRepoJPA extends JpaRepository<Praktisi, Long> {
    // Tambahkan method tambahan jika diperlukan
    @Query("SELECT m,u FROM Praktisi m JOIN m.user u WHERE u.username LIKE %:username%")
    List<Praktisi> findByUsername(@Param("username") String username);
}
