package com.cole.vo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user")
public class User {
	@Id
	@Column(name = "id_user")
	private Long id_user;

	@Column(name = "nama")
	private String nama;

	@Column(name = "username")
	private String username;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "tanggal_lahir")
	private Date tanggal_lahir;

	@Column(name = "location")
	private String location;

	@Column(name = "about")
	private String about;

	@Column(name = "token")
	private String token;
	
	@Column(name = "profile_url")
	private String ProfileUrl;

	@Column (name = "role")
	private String role;

	@Column (name = "firstname")
	private String firstname;
	
	@Column (name = "lastname")
	private String lastname;

	@Column (name = "username_moodle")
	private String username_moodle;

	@Column (name = "password_moodle")
	private String password_moodle;

	@Column (name = "tanggal_daftar")
	private Date tanggal_daftar;


	@OneToOne(mappedBy = "user")
    private Mahasiswa mahasiswa;

	// Constructor
	public User() {
	}

	// constructor with id
	public User(
			Long id_user,
			String nama,
			String username,
			String email,
			String password,
			Date tanggal_lahir,
			String location,
			String about,
			String token,
			String ProfileUrl,
			String role,
			Date tanggal_daftar) {
		this.id_user = id_user;
		this.nama = nama;
		this.username = username;
		this.email = email;
		this.password = password;
		this.tanggal_lahir = tanggal_lahir;
		this.location = location;
		this.ProfileUrl = ProfileUrl;
		this.role = role;
		this.tanggal_daftar = tanggal_daftar;
	}

	// Constructor without id
	public User(
			String nama,
			String username,
			String email,
			String password,
			Date tanggal_lahir,
			String location,
			String about,
			String token,
			String ProfileUrl,
			String role,
			Date tanggal_daftar) {
		this.nama = nama;
		this.username = username;
		this.email = email;
		this.password = password;
		this.tanggal_lahir = tanggal_lahir;
		this.location = location;
		this.about = about;
		this.token = token;
		this.ProfileUrl = ProfileUrl;
		this.role = role;
		this.tanggal_daftar = tanggal_daftar;
	}

	// Constructor MOODLE with id
	public User(
			Long id_user,
			String nama,
			String username,
			String email,
			String password,
			Date tanggal_lahir,
			String location,
			String about,
			String token,
			String ProfileUrl,
			String role,
			String firstname,
			String lastname,
			String username_moodle,
			String password_moodle,
			Date tanggal_daftar) {
		this.id_user = id_user;
		this.nama = nama;
		this.username = username;
		this.email = email;
		this.password = password;
		this.tanggal_lahir = tanggal_lahir;
		this.location = location;
		this.about = about;
		this.token = token;
		this.ProfileUrl = ProfileUrl;
		this.role = role;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username_moodle = username_moodle;
		this.password_moodle = password_moodle;
		this.tanggal_daftar = tanggal_daftar;
	}

	// EDIT CONSTRUCTOR
	public User(
			Long id_user,
			String username,
			Date tanggal_lahir,
			String location,
			String about,
			// String ProfileUrl,
			String firstname,
			String lastname) {
		this.id_user = id_user;
		this.username = username;
		this.tanggal_lahir = tanggal_lahir;
		this.location = location;
		this.about = about;
		// this.ProfileUrl = ProfileUrl;
		this.firstname = firstname;
		this.lastname = lastname;
	}

	// Getter and Setter
	public Long getId_user() {
		return id_user;
	}

	public void setId_user(Long id_user) {
		this.id_user = id_user;
	}

	public String getNama() {
		return nama;
	}

	public void setNama(String nama) {
		this.nama = nama;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public Date getTanggal_lahir() {
		return tanggal_lahir;
	}

	public void setTanggal_lahir(Date tanggal_lahir) {
		this.tanggal_lahir = tanggal_lahir;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getProfileUrl() {
		return ProfileUrl;
	}

	public void setProfileUrl(String ProfileUrl) {
		this.ProfileUrl = ProfileUrl;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername_moodle() {
		return username_moodle;
	}

	public void setUsername_moodle(String username_moodle) {
		this.username_moodle = username_moodle;
	}

	public String getPassword_moodle() {
		return password_moodle;
	}

	public void setPassword_moodle(String password_moodle) {
		this.password_moodle = password_moodle;
	}

	public Date getTanggal_daftar() {
		return tanggal_daftar;
	}

	public void setTanggal_daftar(Date tanggal_daftar) {
		this.tanggal_daftar = tanggal_daftar;
	}
}
