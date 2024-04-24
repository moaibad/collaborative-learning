package com.cole.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.cole.vo.User;

public class UserMapper implements RowMapper<User> {

	@Override
	public User mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
		User user = new User();

		user.setId_user(rs.getLong("id_user"));
		user.setNama(rs.getString("nama"));
		user.setUsername(rs.getString("username"));
		user.setEmail(rs.getString("email"));
		user.setPassword(rs.getString("password"));
		user.setTanggal_lahir(rs.getDate("tanggal_lahir"));
		user.setLocation(rs.getString("location"));
		user.setAbout(rs.getString("about"));
		user.setToken(rs.getString("token"));
		user.setProfileUrl(rs.getString("profile_url"));
		user.setRole(rs.getString("role"));
		user.setTanggal_daftar(rs.getDate("tanggal_daftar"));
		
		return user;

	}
}
