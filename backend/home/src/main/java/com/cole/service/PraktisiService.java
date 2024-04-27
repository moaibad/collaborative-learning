package com.cole.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cole.repository.PraktisiRepoJPA;
import com.cole.repository.PraktisiRepository;
import com.cole.vo.Praktisi;

@Service
public class PraktisiService {

    @Autowired
    private PraktisiRepository praktisiRepository;

    @Autowired
    private PraktisiRepoJPA praktisiRepoJPA;

    public Praktisi findOne(Long id_praktisi) {
        return praktisiRepository.findOne(id_praktisi);
    }

    public Praktisi findOneByUserId(Long id_user) {
        return praktisiRepository.findOneByUserId(id_user);
    }

    public List<Praktisi> findAll() {
        return praktisiRepository.findAll();
    }

    public int save(Praktisi praktisi) {
        return praktisiRepository.save(praktisi);
    }

    public int update(Praktisi praktisi) {
        return praktisiRepository.update(praktisi);
    }

    public int updateByUserId(Praktisi praktisi) {

        Praktisi result = praktisiRepository.findOne(praktisi.getId_praktisi());

        if(praktisi.getAsal_perusahaan() != null){
            result.setAsal_perusahaan(praktisi.getAsal_perusahaan());
        }
        if(praktisi.getPendidikan_terakhir() != null){
            result.setPendidikan_terakhir(praktisi.getPendidikan_terakhir());
        }
        if(praktisi.getPosisi() != null){
            result.setPosisi(praktisi.getPosisi());
        }

        return praktisiRepository.updateByUserId(result);
    }
    
    public int delete(Long id_praktisi) {
        return praktisiRepository.delete(id_praktisi);
    }

    public int deleteByUserId(Long id_user) {
        return praktisiRepository.deleteByUserId(id_user);
    }

    // find by username
    public List<Praktisi> findByUsername(String username) {
        return praktisiRepoJPA.findByUsername(username);
    }
}
