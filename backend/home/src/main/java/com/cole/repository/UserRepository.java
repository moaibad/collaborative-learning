package com.cole.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.cole.mapper.MahasiswaMapper;
import com.cole.mapper.UserMapper;
import com.cole.vo.Mahasiswa;
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

		String sql = "INSERT INTO user(nama, username, email, password, tanggal_lahir, location, about ,token, profile_url, role, tanggal_daftar) VALUES(?,?,?,?,?,?,?,?,?,?,?)";

		return jdbcTemplate.update(sql, user.getNama(), user.getUsername(),
				user.getEmail(), user.getPassword(),
				user.getTanggal_lahir(), user.getLocation(), user.getAbout(), 
				user.getToken(), user.getProfileUrl(), user.getRole(), user.getTanggal_daftar());
	}

	//UPDATE USER DATA
	public int updateUser(User user) {
		String sql = "UPDATE user SET username = ?, tanggal_lahir = ?, location = ?, about = ?, firstname = ?, lastname = ? WHERE id_user = ?";

		return jdbcTemplate.update(sql, user.getUsername(),
				user.getTanggal_lahir(), user.getLocation(), user.getAbout(),
				user.getFirstname(), user.getLastname(), user.getId_user());
	}

	public int updateUserToken(User user) {
		String sql = "UPDATE user SET username = ?, tanggal_lahir = ?, location = ?, about = ?, firstname = ?, lastname = ?, token = ? WHERE id_user = ?";

		return jdbcTemplate.update(sql, user.getUsername(),
				user.getTanggal_lahir(), user.getLocation(), user.getAbout(),
				user.getFirstname(), user.getLastname(), user.getToken(), user.getId_user());
	}

	//ADD Personal Info
	public int addPersonalInfo(User user) {
        String sql = "UPDATE user SET firstname = ?, lastname = ?, username = ?, tanggal_lahir = ?, location = ?, about = ?, role = ?, username_moodle = ?, password_moodle = ? WHERE id_user = ?";
        return jdbcTemplate.update(sql, user.getFirstname(), user.getLastname(), user.getUsername(),
										user.getTanggal_lahir(), user.getLocation(), 
										user.getAbout(), user.getRole(),
										user.getUsername_moodle(), user.getPassword_moodle(), 
										user.getId_user());
    }

	//FIND BY EMAIL AND PASSWORD
	public User findUserByEmailAndPassword(String email, String password) {
		String sql = "SELECT * FROM user WHERE email = ? AND password = ?";
		RowMapper<User> rowMapper = new UserMapper();
		List<User> userList = jdbcTemplate.query(sql, rowMapper, email, password);
		return userList.isEmpty() ? null : userList.get(0);
	}

	//Find Mahasiswa
	public List<Mahasiswa> findMahasiswa(String username) {
		String sql = "SELECT u.*, m.*" +
		"FROM user u " +
		"JOIN mahasiswa m ON u.id_user = m.user_id_user " +
		"WHERE u.username LIKE ?";
		RowMapper<Mahasiswa> rowMapper = new MahasiswaMapper();
		return this.jdbcTemplate.query(sql, rowMapper, username);
	}

	//Find Dosen
	public List<User> findDosen(String username) {
		String sql = "SELECT u.*, d.* " + "FROM user u " + "JOIN dosen d ON u.id_user = d.user_id_user " + "WHERE u.username LIKE ?";
		RowMapper<User> rowMapper = new UserMapper();
		return this.jdbcTemplate.query(sql, rowMapper, username);
	}

	//Find Praktisi
	public List<User> findPraktisi(String username) {
		String sql = "SELECT u.*, p.* " + "FROM user u " + "JOIN praktisi p ON u.id_user = p.user_id_user " + "WHERE u.username LIKE ?";
		RowMapper<User> rowMapper = new UserMapper();
		return this.jdbcTemplate.query(sql, rowMapper, username);
	}
}
