package com.cole.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cole.service.PraktisiService;
import com.cole.service.UserService;
import com.cole.vo.Praktisi;
import com.cole.vo.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PraktisiController {

    @Autowired
    private PraktisiService praktisiService;

    @Autowired
    private UserService userService;

    // CREATE
    @PostMapping("/praktisi")
    public ResponseEntity<Praktisi> createPraktisi(@RequestBody Praktisi praktisi) {
        // Pastikan objek User tersedia dalam database
        User user = userService.getUserById(praktisi.getUser_id_user());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Set objek User ke properti user pada objek Praktisi
        praktisi.setUser(user);

        // Sekarang coba menyimpan objek Praktisi
        int result = praktisiService.save(praktisi);
        if (result == 1) {
            return new ResponseEntity<>(praktisi, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ BY ID 
    @GetMapping("/praktisi/{id}") // {id} berasal dari user id
    public ResponseEntity<Praktisi> getPraktisiById(@PathVariable("id") Long id) {
        Praktisi praktisi = praktisiService.findOneByUserId(id);
        if (praktisi != null) {
            return new ResponseEntity<>(praktisi, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ ALL
    @GetMapping("/praktisis")
    public ResponseEntity<List<Praktisi>> getAllPraktisi() {
        List<Praktisi> praktisiList = praktisiService.findAll();
        return new ResponseEntity<>(praktisiList, HttpStatus.OK);
    }

    // UPDATE
    @PutMapping("/praktisi/{id}") // Menggunakan {id} dari user id
    public ResponseEntity<?> updatePraktisi(@PathVariable Long id, @RequestBody Praktisi praktisi) {
        // Memastikan data praktisi yang akan diupdate ada
        Praktisi existingPraktisi = praktisiService.findOneByUserId(id);
        if (existingPraktisi == null) {
            return new ResponseEntity<>("Failed to update praktisi, Praktisi not found", HttpStatus.NOT_FOUND);
        }

        // Melakukan update pada data praktisi
        existingPraktisi.setAsal_perusahaan(praktisi.getAsal_perusahaan());
        existingPraktisi.setPendidikan_terakhir(praktisi.getPendidikan_terakhir());
        existingPraktisi.setPosisi(praktisi.getPosisi());
        existingPraktisi.setUser_id_user(praktisi.getUser_id_user());

        // Memanggil metode service untuk melakukan pembaruan
        praktisiService.updateByUserId(existingPraktisi);

        return new ResponseEntity<>(existingPraktisi, HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/praktisi/{id}") // Id merupakan user id
    public ResponseEntity<Void> deletePraktisiById(@PathVariable("id") Long id) {
        int result = praktisiService.deleteByUserId(id);
        if (result == 1) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
