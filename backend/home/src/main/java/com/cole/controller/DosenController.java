package com.cole.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cole.service.DosenService;
import com.cole.service.UserService;
import com.cole.vo.Dosen;
import com.cole.vo.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DosenController {

    @Autowired
    private DosenService dosenService;

    @Autowired
    private UserService userService;

    // CREATE
    @PostMapping("/dosen")
    public ResponseEntity<Dosen> createDosen(@RequestBody Dosen dosen) {
        // Pastikan objek User tersedia dalam database
        User user = userService.getUserById(dosen.getUser_id_user());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Set objek User ke properti user pada objek Dosen
        dosen.setUser(user);

        // Sekarang coba menyimpan objek Dosen
        int result = dosenService.save(dosen);
        if (result == 1) {
            return new ResponseEntity<>(dosen, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ BY ID 
    @GetMapping("/dosen/{id}") // {id} berasal dari user id
    public ResponseEntity<Dosen> getDosenById(@PathVariable("id") Long id) {
        Dosen dosen = dosenService.findOneByUserId(id);
        if (dosen != null) {
            return new ResponseEntity<>(dosen, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ ALL
    @GetMapping("/dosens")
    public ResponseEntity<List<Dosen>> getAllDosen() {
        List<Dosen> dosenList = dosenService.findAll();
        return new ResponseEntity<>(dosenList, HttpStatus.OK);
    }

    // UPDATE
    @PutMapping("/dosen/{id}") // Menggunakan {id} dari user id
    public ResponseEntity<?> updateDosen(@PathVariable Long id, @RequestBody Dosen dosen) {
        // Memastikan data dosen yang akan diupdate ada
        Dosen existingDosen = dosenService.findOneByUserId(id);
        if (existingDosen == null) {
            return new ResponseEntity<>("Failed to update dosen, Dosen not found", HttpStatus.NOT_FOUND);
        }
    
        // Melakukan update pada data dosen
        existingDosen.setJurusan(dosen.getJurusan());
        existingDosen.setPendidikan_terakhir(dosen.getPendidikan_terakhir());
        existingDosen.setUniversitas(dosen.getUniversitas());
    
        // Memanggil metode service untuk melakukan pembaruan
        dosenService.updateByUserId(existingDosen);
        
        return new ResponseEntity<>(existingDosen, HttpStatus.OK);
        
    }
    
    // DELETE
    @DeleteMapping("/dosen/{id}") // Id merupakan user id
    public ResponseEntity<Void> deleteDosenById(@PathVariable("id") Long id) {
        int result = dosenService.deleteByUserId(id);
        if (result == 1) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dosen/search/{username}")
    public List<Dosen> getDosenByname(@PathVariable("username") String username) {
        return dosenService.findByUsername(username);
    }
}
