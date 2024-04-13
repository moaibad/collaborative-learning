package com.cole.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.cole.vo.Mahasiswa;

public class MahasiswaMapper implements RowMapper<Mahasiswa> {

    @Override
    public Mahasiswa mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        Mahasiswa mahasiswa = new Mahasiswa();

        mahasiswa.setId_mhs(rs.getLong("id_mhs"));
        mahasiswa.setJurusan(rs.getString("jurusan"));
        mahasiswa.setAngkatan(rs.getString("angkatan"));
        mahasiswa.setUniversitas(rs.getString("universitas"));
        mahasiswa.setUser_id_user(rs.getLong("user_id_user"));

        return mahasiswa;
    }
}



        // // User ID from User Table
        // int user_id_user = rs.getInt("user_id_user");
        // User user = new User();
        // user.setId_user((long) user_id_user);

        // mahasiswa.setUser(user);