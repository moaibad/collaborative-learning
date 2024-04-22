package com.cole.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cole.service.FollowService;
import com.cole.vo.Follow;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("follower/new")
    public Follow saveFollow(@RequestBody Follow follow) {
        return followService.saveFollow(follow);
    }

    @DeleteMapping("follower/delete/{id}")
    public void deleteFollow(@PathVariable("id") Long followId) {
        followService.deleteFollow(followId);
    }

    @GetMapping("follower/{id}")
    public List<Follow> getAllFollowers(@PathVariable("id") Long follower) {
        return followService.getFollowersById(follower);
    }

    @GetMapping("following/{id}")
    public List<Follow> getAllFollowees(@PathVariable("id") Long followee) {
        return followService.getFolloweesById(followee);
    }

}
