package com.cole.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.cole.mapper.DosenMapper;
import com.cole.vo.Dosen;

@Repository
public class DosenRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Dosen findOne(Long id) {
        String sql = "SELECT * FROM dosen WHERE id_dosen = ?";
        RowMapper<Dosen> rowMapper = new DosenMapper();
        return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public Dosen findOneByUserId(Long id) {
        String sql = "SELECT * FROM dosen WHERE user_id_user = ?";
        RowMapper<Dosen> rowMapper = new DosenMapper();
        return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public List<Dosen> findAll() {
        String sql = "SELECT * FROM dosen";
        RowMapper<Dosen> rowMapper = new DosenMapper();
        return this.jdbcTemplate.query(sql, rowMapper);
    }

    public int save(Dosen dosen) {
        String sql = "INSERT INTO dosen (jurusan, universitas, pendidikan_terakhir, user_id_user) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, dosen.getJurusan(), dosen.getUniversitas(), dosen.getPendidikan_terakhir(), dosen.getUser().getId_user());
    }

    public int update(Dosen dosen) {
        String sql = "UPDATE dosen SET jurusan = ?, universitas = ?, pendidikan_terakhir = ? WHERE id_dosen = ?";
        return jdbcTemplate.update(sql, dosen.getJurusan(), dosen.getUniversitas(), dosen.getPendidikan_terakhir(), dosen.getId_dosen());
    }

    public int updateByUserId(Dosen dosen) {
        String sql = "UPDATE dosen SET jurusan = ?, universitas = ?, pendidikan_terakhir = ? WHERE user_id_user = ?";
        return jdbcTemplate.update(sql, dosen.getJurusan(), dosen.getUniversitas(), dosen.getPendidikan_terakhir(), dosen.getUser_id_user());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM dosen WHERE id_dosen = ?";
        return jdbcTemplate.update(sql, id);
    }

    public int deleteByUserId(Long id) {
        String sql = "DELETE FROM dosen WHERE user_id_user = ?";
        return jdbcTemplate.update(sql, id);
    }
}
