package com.cole.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cole.service.UserService;
import com.cole.repository.UserRepoJPA;
import com.cole.service.UserProfileService;
import com.cole.vo.User;
import com.cole.vo.Mahasiswa;
import com.cole.vo.Result;
import com.cole.vo.UserTokenInfo;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	UserProfileService userProfileService;

	@Autowired UserRepoJPA userRepoJPA;

	// GET User BY ID API
	@GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") Long id_user) {
		User user = userService.getUserById(id_user);
		return user;
	}

	// GET List MAHASISWA API
	@GetMapping("/users")
	public List<User> getUsers() {
		List<User> users = userService.getUsers();
		return users;
	}

	// GET MAHASISWA API
	@GetMapping("/user")
	public User getUserByToken(@RequestHeader("Authorization") String authorizationHeader) {
		String userToken = authorizationHeader.replace("Bearer ", "");
		System.out.println("token : " + userToken);
		User user = userService.getUserByToken(userToken);
		System.out.println("user : " + user);
		return user;
	}

	// Login User API
	@PostMapping("/user/login")
	public Object loginUser(HttpServletResponse response, @RequestBody User userParam) {
		User user = userService.loginUser(userParam.getEmail(), userParam.getPassword());
		if (user != null) {
			Long userId = user.getId_user();
			return new Result(200, "Success", userId);
		} else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return new Result(401, "Incorect Email or Password");
		}
	}

	// Register User API (OLD API WITH MANUAL REGISTER)
	@PostMapping("/user/register")
	public Object registerUser(HttpServletResponse response, @RequestBody User userParam) {
		User user = new User(userParam.getNama(), userParam.getUsername(),
				userParam.getEmail(), userParam.getPassword(),
				userParam.getTanggal_lahir(), userParam.getLocation(), userParam.getAbout(),
				userParam.getToken(), userParam.getProfileUrl(), userParam.getRole());

		int saveResult = userService.saveUser(user);

		if (saveResult == 1) {
			return ResponseEntity.ok().body(new Result(200, "Success"));
		} else if (saveResult == 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Result(400, "Username already exists"));
		} else if (saveResult == -1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Result(401, "Email already registered"));
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Result(500, "Failed to register"));
		}
	}

	// login & registrasi OAuth
	@PostMapping("/oauth/user")
	public ResponseEntity<Object> oauthUser(
			HttpServletResponse response,
			@RequestBody User userParam,
			@RequestHeader("Authorization") String authorizationHeader) {

		if (authorizationHeader == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new Result(401, "Authorization header is missing"));
		}
		
		String userToken = authorizationHeader.replace("Bearer ", "");
		// Fetch user information from the Google API using the access_token
		UserTokenInfo userTokenInfo = userProfileService.fetchUserProfile(userToken);

		if (userTokenInfo == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new Result(500, "Failed to fetch user profile"));
		}
		System.out.println(userTokenInfo.getEmail());
		
		// Check if the email exists
		User existingUser = userService.getUserByEmail(userTokenInfo.getEmail());

		// Login
		if (existingUser != null) {
			existingUser.setToken(userToken);
			// Email exists, return the data
			boolean updateUser = userService.updateUser(existingUser);
			if (updateUser) {
				System.out.println(existingUser.getToken());
			}

			Long userId = existingUser.getId_user();
			// Send a message indicating the account is already registered
			return ResponseEntity.ok().body(new Result(200, "login successfully", userId));

		// register
		}else {
			User user = new User(userTokenInfo.getName(), userTokenInfo.getName(),
					userTokenInfo.getEmail(), userParam.getPassword(),
					userParam.getTanggal_lahir(), userParam.getLocation(), userParam.getAbout(),
					userToken, userTokenInfo.getPicture(), userParam.getRole());
			int saveResult = userService.saveUser(user);
	
			if (saveResult == 1) {
				return ResponseEntity.status(HttpStatus.CREATED).body(new Result(201, "Account registered successfully"));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Result(500, "Failed to register"));
			}
		}
	}

	// EDIT MAHASISWA BY ID API
	@PutMapping("/user/{id}")
	public Object modifyUser(HttpServletResponse response, @PathVariable("id") Long id_user,
			@RequestBody User userParam) {
		User user = new User(id_user, userParam.getNama(), userParam.getUsername(),
				userParam.getEmail(), userParam.getPassword(),
				userParam.getTanggal_lahir(), userParam.getLocation(), userParam.getAbout(),
				userParam.getToken(), userParam.getProfileUrl(), userParam.getRole());

		boolean isSuccess = userService.updateUser(user);
		if (isSuccess) {
			return new Result(200, "Success");
		} else {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return new Result(500, "Fail");
		}
	}

	//Find mahasiswa by username
	@GetMapping("/user/search/mahasiswa/{username}")
	public List<Mahasiswa> getMahasiswaByUsername(@PathVariable("username") String username) {
		List<Mahasiswa> user = userService.getMahasiswaByUsername(username);
		return user;
	}

	//find dosen by username
	@GetMapping("/user/search/dosen/{username}")
	public List<User> getDosenByUsername(@PathVariable("username") String username) {
		List<User> user = userService.getDosenByUsername(username);
		return user;
	}

	//find prakrisi by username
	@GetMapping("/user/search/prakrisi/{username}")
	public List<User> getPraktisiByUsername(@PathVariable("username") String username) {
		List<User> user = userService.getPraktisiByUsername(username);
		return user;
	}

	//find user by username
	@GetMapping("/user/search/{username}")
	public User getUserByUsername(@PathVariable("username") String username) {
		User user = userRepoJPA.findByUsername(username);
		return user;
	}
}
