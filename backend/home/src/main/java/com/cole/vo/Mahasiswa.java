package com.cole.vo;

// import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 

@Entity
@Table(name = "mahasiswa")
@JsonIgnoreProperties({"user"})
public class Mahasiswa {
    @Id
	@Column(name = "id_mhs")
	private Long id_mhs;

	@Column(name = "jurusan")
	private String jurusan;

	@Column(name = "angkatan")
	private String angkatan;

	@Column(name = "universitas")
	private String universitas;

    @OneToOne
    @JoinColumn(name = "user_id_user", referencedColumnName = "id_user")
    private User user;


    // NULL Constructor
    public Mahasiswa(){

    }

    //Constructor without ID
    public Mahasiswa(String jurusan, String angkatan, String universitas, User user) {
        this.jurusan = jurusan;
        this.angkatan = angkatan;
        this.universitas = universitas;
        this.user = user;
    }

    //Constructor with ID
    public Mahasiswa(Long id_mhs, String jurusan, String angkatan, String universitas, User user) {
        this.id_mhs = id_mhs;
        this.jurusan = jurusan;
        this.angkatan = angkatan;
        this.universitas = universitas;
        this.user = user;
    }

    //GETTER AND SETTER
    public Long getId_mhs() {
        return id_mhs;
    }

    public void setId_mhs(Long id_mhs) {
        this.id_mhs = id_mhs;
    }

    public String getJurusan() {
        return jurusan;
    }

    public void setJurusan(String jurusan) {
        this.jurusan = jurusan;
    }

    public String getAngkatan() {
        return angkatan;
    }

    public void setAngkatan(String angkatan) {
        this.angkatan = angkatan;
    }

    public String getUniversitas() {
        return universitas;
    }

    public void setUniversitas(String universitas) {
        this.universitas = universitas;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // GETTER AND SETTER for user_id_user 
    public Long getUser_id_user() {
        return (user != null) ? user.getId_user() : null;
    }

    public void setUser_id_user(Long user_id_user) {
        if (user == null) {
            user = new User();
        }
        user.setId_user(user_id_user);
    }
    
}
