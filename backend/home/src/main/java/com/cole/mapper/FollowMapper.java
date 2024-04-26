package com.cole.mapper;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import com.cole.vo.Follow;
import com.cole.vo.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FollowMapper implements RowMapper<Follow> {

    @Override
    public Follow mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
        Follow follow = new Follow();

        follow.setId(rs.getLong("follow_id"));
        follow.setFollowerId(rs.getLong("follower_id"));
        follow.setFolloweeId(rs.getLong("followee_id"));

        return follow;
    }
}
