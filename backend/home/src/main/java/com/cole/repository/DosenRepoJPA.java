package com.cole.repository;

import com.cole.vo.Dosen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DosenRepoJPA extends JpaRepository<Dosen, Long> {
    // Tambahkan method tambahan jika diperlukan
    @Query("SELECT m,u FROM Dosen m JOIN m.user u WHERE u.username LIKE %:username%")
    List<Dosen> findByUsername(@Param("username") String username);
}
