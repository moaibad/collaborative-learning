package com.cole.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.cole.mapper.UserMapper;
import com.cole.vo.User;

@Repository
public class UserRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public User findOne(Long id) {
		String sql = "SELECT * FROM user WHERE id_user = ?";

		RowMapper<User> rowMapper = new UserMapper();

		return this.jdbcTemplate.queryForObject(sql, rowMapper, id);
	}

	public List<User> findUsers() {
		String sql = "SELECT * FROM user";
		RowMapper<User> rowMapper = new UserMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}

	public User findByUsername(String username) {
		String sql = "SELECT * FROM user WHERE username = ?";
		RowMapper<User> rowMapper = new UserMapper();
		List<User> userList = jdbcTemplate.query(sql, rowMapper, username);
		return userList.isEmpty() ? null : userList.get(0);
	}

	public User findByToken(String token) {
		String sql = "SELECT * FROM user WHERE token = ?";
		RowMapper<User> rowMapper = new UserMapper();
		List<User> userList = jdbcTemplate.query(sql, rowMapper, token);
		return userList.isEmpty() ? null : userList.get(0);
	}

	public User findByEmail(String email) {
		String sql = "SELECT * FROM user WHERE email = ?";
		RowMapper<User> rowMapper = new UserMapper();
		List<User> userList = jdbcTemplate.query(sql, rowMapper, email);
		return userList.isEmpty() ? null : userList.get(0);
	}

	// REGISTER
	public int saveUser(User user) {
		// Check if username already exists
		User existingUsername = findByUsername(user.getUsername());
		if (existingUsername != null) {
			return 0; // Username already taken
		}

		// Check if email already exists
		User existingEmail = findByEmail(user.getEmail());
		if (existingEmail != null) {
			return -1; // Email already registered
		}

		String sql = "INSERT INTO user(nama, username, email, password, tanggal_lahir, location, about ,token, profile_url, role) VALUES(?,?,?,?,?,?,?,?,?,?)";

		return jdbcTemplate.update(sql, user.getNama(), user.getUsername(),
				user.getEmail(), user.getPassword(),
				user.getTanggal_lahir(), user.getLocation(), user.getAbout(), 
				user.getToken(), user.getProfileUrl(), user.getRole());
	}

	//UPDATE USER DATA
	public int updateUser(User user) {
		String sql = "UPDATE user SET nama = ?, username = ?, email = ?, password = ?, tanggal_lahir = ?, location = ?, about = ?, token = ?, profile_url = ? WHERE id_user = ?";

		return jdbcTemplate.update(sql, user.getNama(), user.getUsername(),
				user.getEmail(), user.getPassword(),
				user.getTanggal_lahir(), user.getLocation(), user.getAbout(),
				user.getToken(), user.getProfileUrl(), user.getId_user());
	}

	//FIND BY EMAIL AND PASSWORD
	public User findUserByEmailAndPassword(String email, String password) {
		String sql = "SELECT * FROM user WHERE email = ? AND password = ?";
		RowMapper<User> rowMapper = new UserMapper();
		List<User> userList = jdbcTemplate.query(sql, rowMapper, email, password);
		return userList.isEmpty() ? null : userList.get(0);
	}
}
