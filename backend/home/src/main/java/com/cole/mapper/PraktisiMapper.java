package com.cole.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.cole.vo.Praktisi;

public class PraktisiMapper implements RowMapper<Praktisi> {

    @Override
    public Praktisi mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        Praktisi praktisi = new Praktisi();

        praktisi.setId_praktisi(rs.getLong("id_praktisi"));
        praktisi.setAsal_perusahaan(rs.getString("asal_perusahaan"));
        praktisi.setPendidikan_terakhir(rs.getString("pendidikan_terakhir"));
        praktisi.setUser_id_user(rs.getLong("user_id_user"));

        return praktisi;
    }
}
