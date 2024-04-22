package com.cole.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cole.repository.MahasiswaRepoJPA;
import com.cole.repository.MahasiswaRepository;
import com.cole.vo.Mahasiswa;

@Service
public class MahasiswaService {

    @Autowired
    private MahasiswaRepository mahasiswaRepository;

    @Autowired
    private MahasiswaRepoJPA mahasiswaRepositoryJPA;

    public List<Mahasiswa> findByUsername(String username) {
        return mahasiswaRepositoryJPA.findByUsername(username);
    }
    
    public Mahasiswa findOne(Long id_mhs) {
        return mahasiswaRepository.findOne(id_mhs);
    }

    public Mahasiswa findOneByUserId(Long id_user) {
        return mahasiswaRepository.findOneByUserId(id_user);
    }

    public List<Mahasiswa> findAll() {
        return mahasiswaRepository.findAll();
    }

    public int save(Mahasiswa mahasiswa) {
        return mahasiswaRepository.save(mahasiswa);
    }

    public int update(Mahasiswa mahasiswa) {
        return mahasiswaRepository.update(mahasiswa);
    }

    public int updateByUserId(Mahasiswa mahasiswa) {
        return mahasiswaRepository.updateByUserId(mahasiswa);
    }
    
    public int delete(Long id_mhs) {
        return mahasiswaRepository.delete(id_mhs);
    }

    public int deleteByUserId(Long id_user) {
        return mahasiswaRepository.deleteByUserId(id_user);
    }
}
