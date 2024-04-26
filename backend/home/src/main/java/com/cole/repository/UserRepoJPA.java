package com.cole.repository;

import com.cole.vo.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepoJPA extends JpaRepository<User, Long> {
    //find by username
    User findByUsername(String username);
}
