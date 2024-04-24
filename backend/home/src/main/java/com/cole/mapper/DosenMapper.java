package com.cole.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.cole.vo.Dosen;

public class DosenMapper implements RowMapper<Dosen> {

    @Override
    public Dosen mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        Dosen dosen = new Dosen();

        dosen.setId_dosen(rs.getLong("id_dosen"));
        dosen.setJurusan(rs.getString("jurusan"));
        dosen.setUniversitas(rs.getString("universitas"));
        dosen.setPendidikan_terakhir(rs.getString("pendidikan_terakhir"));
        dosen.setUser_id_user(rs.getLong("user_id_user"));

        return dosen;
    }
}
