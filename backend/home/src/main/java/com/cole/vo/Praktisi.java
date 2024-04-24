package com.cole.vo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 

@Entity
@Table(name = "praktisi")
@JsonIgnoreProperties({"user"})
public class Praktisi {
    @Id
    @Column(name = "id_praktisi")
    private Long id_praktisi;

    @Column(name = "asal_perusahaan")
    private String asal_perusahaan;

    @Column(name = "pendidikan_terakhir")
    private String pendidikan_terakhir;

    @Column(name = "posisi")
    private String posisi;

    @OneToOne
    @JoinColumn(name = "user_id_user", referencedColumnName = "id_user")
    private User user;

    // NULL Constructor
    public Praktisi(){

    }

    // Constructor without ID
    public Praktisi(String asal_perusahaan, String pendidikan_terakhir, String posisi, User user) {
        this.asal_perusahaan = asal_perusahaan;
        this.pendidikan_terakhir = pendidikan_terakhir;
        this.posisi = posisi;
        this.user = user;
    }

    // Constructor with ID
    public Praktisi(Long id_praktisi, String asal_perusahaan, String pendidikan_terakhir, String posisi, User user) {
        this.id_praktisi = id_praktisi;
        this.asal_perusahaan = asal_perusahaan;
        this.pendidikan_terakhir = pendidikan_terakhir;
        this.posisi = posisi;
        this.user = user;
    }

    // GETTER AND SETTER
    public Long getId_praktisi() {
        return id_praktisi;
    }

    public void setId_praktisi(Long id_praktisi) {
        this.id_praktisi = id_praktisi;
    }

    public String getAsal_perusahaan() {
        return asal_perusahaan;
    }

    public void setAsal_perusahaan(String asal_perusahaan) {
        this.asal_perusahaan = asal_perusahaan;
    }

    public String getPendidikan_terakhir() {
        return pendidikan_terakhir;
    }

    public void setPendidikan_terakhir(String pendidikan_terakhir) {
        this.pendidikan_terakhir = pendidikan_terakhir;
    }

    public String getPosisi() {
        return posisi;
    }

    public void setPosisi(String posisi) {
        this.posisi = posisi;
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
