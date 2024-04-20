package com.cole.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.cole.mapper.MahasiswaMapper;
import com.cole.vo.Mahasiswa;

@Repository
public class MahasiswaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Mahasiswa findOne(Long id) {
        String sql = "SELECT * FROM mahasiswa WHERE id_mhs = ?";
        RowMapper<Mahasiswa> rowMapper = new MahasiswaMapper();
        return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public Mahasiswa findOneByUserId(Long id) {
        String sql = "SELECT * FROM mahasiswa WHERE user_id_user = ?";
        RowMapper<Mahasiswa> rowMapper = new MahasiswaMapper();
        return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public List<Mahasiswa> findAll() {
        String sql = "SELECT * FROM mahasiswa";
        RowMapper<Mahasiswa> rowMapper = new MahasiswaMapper();
        return this.jdbcTemplate.query(sql, rowMapper);
    }

    public int save(Mahasiswa mahasiswa) {
        String sql = "INSERT INTO mahasiswa (jurusan, angkatan, universitas, user_id_user) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, mahasiswa.getJurusan(), mahasiswa.getAngkatan(), mahasiswa.getUniversitas(), mahasiswa.getUser().getId_user());
    }

    public int update(Mahasiswa mahasiswa) {
        String sql = "UPDATE mahasiswa SET jurusan = ?, angkatan = ?, universitas = ? WHERE id_mhs = ?";
        return jdbcTemplate.update(sql, mahasiswa.getJurusan(), mahasiswa.getAngkatan(), mahasiswa.getUniversitas(), mahasiswa.getId_mhs());
    }

    public int updateByUserId(Mahasiswa mahasiswa) {
        String sql = "UPDATE mahasiswa SET jurusan = ?, angkatan = ?, universitas = ? WHERE user_id_user = ?";
        return jdbcTemplate.update(sql, mahasiswa.getJurusan(), mahasiswa.getAngkatan(), mahasiswa.getUniversitas(), mahasiswa.getUser_id_user());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM mahasiswa WHERE id_mhs = ?";
        return jdbcTemplate.update(sql, id);
    }

    public int deleteByUserId(Long id) {
        String sql = "DELETE FROM mahasiswa WHERE user_id_user = ?";
        return jdbcTemplate.update(sql, id);
    }
}
