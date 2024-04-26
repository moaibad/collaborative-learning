package com.cole.vo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 

@Entity
@Table(name = "dosen")
@JsonIgnoreProperties({"user"})
public class Dosen {
    @Id
	@Column(name = "id_dosen")
	private Long id_dosen;

	@Column(name = "jurusan")
	private String jurusan;

	@Column(name = "universitas")
	private String universitas;

    @Column(name = "pendidikan_terakhir")
    private String pendidikan_terakhir;

    @OneToOne
    @JoinColumn(name = "user_id_user", referencedColumnName = "id_user")
    private User user;


    // NULL Constructor
    public Dosen(){

    }

    //Constructor without ID
    public Dosen(String jurusan, String universitas, String pendidikan_terakhir, User user) {
        this.jurusan = jurusan;
        this.universitas = universitas;
        this.pendidikan_terakhir = pendidikan_terakhir;
        this.user = user;
    }

    //Constructor with ID
    public Dosen(Long id_dosen, String jurusan, String universitas, String pendidikan_terakhir, User user) {
        this.id_dosen = id_dosen;
        this.jurusan = jurusan;
        this.universitas = universitas;
        this.pendidikan_terakhir = pendidikan_terakhir;
        this.user = user;
    }

    //GETTER AND SETTER
    public Long getId_dosen() {
        return id_dosen;
    }

    public void setId_dosen(Long id_dosen) {
        this.id_dosen = id_dosen;
    }

    public String getJurusan() {
        return jurusan;
    }

    public void setJurusan(String jurusan) {
        this.jurusan = jurusan;
    }

    public String getUniversitas() {
        return universitas;
    }

    public void setUniversitas(String universitas) {
        this.universitas = universitas;
    }

    public String getPendidikan_terakhir() {
        return pendidikan_terakhir;
    }

    public void setPendidikan_terakhir(String pendidikan_terakhir) {
        this.pendidikan_terakhir = pendidikan_terakhir;
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
