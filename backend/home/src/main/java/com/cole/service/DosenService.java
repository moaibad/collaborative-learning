package com.cole.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cole.repository.DosenRepository;
import com.cole.vo.Dosen;

@Service
public class DosenService {

    @Autowired
    private DosenRepository dosenRepository;

    public Dosen findOne(Long id_dosen) {
        return dosenRepository.findOne(id_dosen);
    }

    public Dosen findOneByUserId(Long id_user) {
        return dosenRepository.findOneByUserId(id_user);
    }

    public List<Dosen> findAll() {
        return dosenRepository.findAll();
    }

    public int save(Dosen dosen) {
        return dosenRepository.save(dosen);
    }

    public int update(Dosen dosen) {
        return dosenRepository.update(dosen);
    }

    public int updateByUserId(Dosen dosen) {
        return dosenRepository.updateByUserId(dosen);
    }
    
    public int delete(Long id_dosen) {
        return dosenRepository.delete(id_dosen);
    }

    public int deleteByUserId(Long id_user) {
        return dosenRepository.deleteByUserId(id_user);
    }
}
