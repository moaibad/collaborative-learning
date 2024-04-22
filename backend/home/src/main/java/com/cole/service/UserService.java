package com.cole.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cole.repository.UserRepository;
import com.cole.vo.Mahasiswa;
import com.cole.vo.User;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	// Get user by id service
	public User getUserById(Long id_user) {
		User user = userRepository.findOne(id_user);

		return user;
	}

	// Login user service
	public User loginUser(String email, String password) {
		User user = userRepository.findUserByEmailAndPassword(email, password);
		return user;
	}

	public User getUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}

	public User getUserByToken(String token) {
		User user = userRepository.findByToken(token);
		return user;
	}

	// Get list user service
	public List<User> getUsers() {
		List<User> userList = userRepository.findUsers();
		return userList;
	}

	// Save/Register user service
	public int saveUser(User user) {
		int result = userRepository.saveUser(user);
		return result;
	}

	// Update user service
	public boolean updateUser(User user) {
		User result = userRepository.findOne(user.getId_user());

		// return false
		if (result == null)
			return false;

		// Update fields that are allowed to be updated
		if (user.getNama() != null) {
			result.setNama(user.getNama());
		}
		if (user.getUsername() != null) {
			result.setUsername(user.getUsername());
		}
		if (user.getEmail() != null) {
			result.setEmail(user.getEmail());
		}
		if (user.getTanggal_lahir() != null) {
			result.setTanggal_lahir(user.getTanggal_lahir());
		}
		if (user.getLocation() != null) {
			result.setLocation(user.getLocation());
		}
		if (user.getAbout() != null) {
			result.setAbout(user.getAbout());
		}
		if (user.getToken() != null) {
			result.setToken(user.getToken());
		}
		if (user.getProfileUrl() != null) {
			result.setProfileUrl(user.getProfileUrl());
		}

		// Check if password is provided and update it if necessary
		String newPassword = user.getPassword();
		if (newPassword != null && !newPassword.isEmpty()) {
			result.setPassword(newPassword);
		}

		// Save the updated User object
		userRepository.updateUser(result);
		return true;
	}

	//find mahasiswa by username
	public List<Mahasiswa> getMahasiswaByUsername(String username) {
		List<Mahasiswa> user = userRepository.findMahasiswa(username);
		return user;
	}

	//find dosen by username
	public List<User> getDosenByUsername(String username) {
		List<User> user = userRepository.findDosen(username);
		return user;
	}

	//find praktisi by username
	public List<User> getPraktisiByUsername(String username) {
		List<User> user = userRepository.findPraktisi(username);
		return user;
	}

	public int addPersonalInfo(User user) {
        return userRepository.addPersonalInfo(user);
    }

}
