package com.cole.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.cole.mapper.PraktisiMapper;
import com.cole.vo.Praktisi;

@Repository
public class PraktisiRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Praktisi findOne(Long id) {
        String sql = "SELECT * FROM praktisi WHERE id_praktisi = ?";
        RowMapper<Praktisi> rowMapper = new PraktisiMapper();
        return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public Praktisi findOneByUserId(Long id) {
        String sql = "SELECT * FROM praktisi WHERE user_id_user = ?";
        RowMapper<Praktisi> rowMapper = new PraktisiMapper();
        return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public List<Praktisi> findAll() {
        String sql = "SELECT * FROM praktisi";
        RowMapper<Praktisi> rowMapper = new PraktisiMapper();
        return this.jdbcTemplate.query(sql, rowMapper);
    }

    public int save(Praktisi praktisi) {
        String sql = "INSERT INTO praktisi (asal_perusahaan, pendidikan_terakhir, user_id_user) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, praktisi.getAsal_perusahaan(), praktisi.getPendidikan_terakhir(), praktisi.getUser().getId_user());
    }

    public int update(Praktisi praktisi) {
        String sql = "UPDATE praktisi SET asal_perusahaan = ?, pendidikan_terakhir = ? WHERE id_praktisi = ?";
        return jdbcTemplate.update(sql, praktisi.getAsal_perusahaan(), praktisi.getPendidikan_terakhir(), praktisi.getId_praktisi());
    }

    public int updateByUserId(Praktisi praktisi) {
        String sql = "UPDATE praktisi SET asal_perusahaan = ?, pendidikan_terakhir = ? WHERE user_id_user = ?";
        return jdbcTemplate.update(sql, praktisi.getAsal_perusahaan(), praktisi.getPendidikan_terakhir(), praktisi.getUser_id_user());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM praktisi WHERE id_praktisi = ?";
        return jdbcTemplate.update(sql, id);
    }

    public int deleteByUserId(Long id) {
        String sql = "DELETE FROM praktisi WHERE user_id_user = ?";
        return jdbcTemplate.update(sql, id);
    }
}
