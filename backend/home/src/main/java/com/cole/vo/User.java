package com.cole.vo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

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
			String role) {
		this.id_user = id_user;
		this.nama = nama;
		this.username = username;
		this.email = email;
		this.password = password;
		this.tanggal_lahir = tanggal_lahir;
		this.location = location;
		this.ProfileUrl = ProfileUrl;
		this.role = role;
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
			String role) {
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
}
