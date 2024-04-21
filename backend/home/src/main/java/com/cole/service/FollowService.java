package com.cole.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cole.repository.FollowRepository;
import com.cole.vo.Follow;

import java.util.List;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    public FollowService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    public Follow saveFollow(Follow follow) {
        return followRepository.save(follow);
    }

    public void deleteFollow(Long followId) {
        followRepository.deleteById(followId);
    }

    public List<Follow> getAllFollows() {
        return followRepository.findAll();
    }

    // ambil data pengguna yang di follow pengguna userId
    public List<Follow> getFolloweesById(Long userId) {
        return followRepository.findByFollowerId(userId);
    }

    // ambil data follower dari pengguna userId
    public List<Follow> getFollowersById(Long userId) {
        return followRepository.findByFolloweeId(userId);
    }

    // You can add more methods as needed, such as finding follows by follower or
    // followee, etc.
}
