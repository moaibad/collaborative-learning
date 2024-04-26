package com.cole.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cole.vo.Follow;
import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    // You can add custom query methods here if needed
    List<Follow> findByFollowerId(Long userId);

    List<Follow> findByFolloweeId(Long userId);
}
