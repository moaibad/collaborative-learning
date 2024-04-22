package com.cole.repository;

import com.cole.vo.Mahasiswa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MahasiswaRepoJPA extends JpaRepository<Mahasiswa, Long> {
    // Tambahkan method tambahan jika diperlukan
    @Query("SELECT m,u FROM Mahasiswa m JOIN m.user u WHERE u.username LIKE %:username%")
    List<Mahasiswa> findByUsername(@Param("username") String username);
}
