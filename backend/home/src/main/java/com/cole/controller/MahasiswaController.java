package com.cole.controller;

import java.util.List;

import javax.swing.plaf.synth.SynthToolTipUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cole.service.MahasiswaService;
import com.cole.service.UserService;
import com.cole.vo.Mahasiswa;
import com.cole.vo.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MahasiswaController {

    @Autowired
    private MahasiswaService mahasiswaService;

    @Autowired
    private UserService userService;

    // CREATE
    @PostMapping("/mahasiswa")
    public ResponseEntity<Mahasiswa> createMahasiswa(@RequestBody Mahasiswa mahasiswa) {
        // Pastikan objek User tersedia dalam database
        User user = userService.getUserById(mahasiswa.getUser_id_user());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Set objek User ke properti user pada objek Mahasiswa
        mahasiswa.setUser(user);

        // Sekarang coba menyimpan objek Mahasiswa
        int result = mahasiswaService.save(mahasiswa);
        if (result == 1) {
            return new ResponseEntity<>(mahasiswa, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ BY ID 
    @GetMapping("/mahasiswa/{id}") // {id} berasal dari user id
    public ResponseEntity<Mahasiswa> getMahasiswaById(@PathVariable("id") Long id) {
        Mahasiswa mahasiswa = mahasiswaService.findOneByUserId(id);
        if (mahasiswa != null) {
            return new ResponseEntity<>(mahasiswa, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ ALL
    @GetMapping("/mahasiswas")
    public ResponseEntity<List<Mahasiswa>> getAllMahasiswa() {
        List<Mahasiswa> mahasiswaList = mahasiswaService.findAll();
        return new ResponseEntity<>(mahasiswaList, HttpStatus.OK);
    }

    // UPDATE
    @PutMapping("/mahasiswa/{id}") // Menggunakan {id} dari user id
    public ResponseEntity<?> updateMahasiswa(@PathVariable Long id, @RequestBody Mahasiswa mahasiswa) {
        // Memastikan data mahasiswa yang akan diupdate ada
        Mahasiswa existingMahasiswa = mahasiswaService.findOneByUserId(id);
        if (existingMahasiswa == null) {
            return new ResponseEntity<>("Failed to update mahasiswa, Mahasiswa not found", HttpStatus.NOT_FOUND);
        }
    
        // Melakukan update pada data mahasiswa
        existingMahasiswa.setJurusan(mahasiswa.getJurusan());
        existingMahasiswa.setAngkatan(mahasiswa.getAngkatan());
        existingMahasiswa.setUniversitas(mahasiswa.getUniversitas());
    
        // Memanggil metode service untuk melakukan pembaruan
        mahasiswaService.updateByUserId(existingMahasiswa);
        
        return new ResponseEntity<>(existingMahasiswa, HttpStatus.OK);
        
    }
    
    // DELETE
    @DeleteMapping("/mahasiswa/{id}") // Id merupakan user id
    public ResponseEntity<Void> deleteMahasiswaById(@PathVariable("id") Long id) {
        int result = mahasiswaService.deleteByUserId(id);
        if (result == 1) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
