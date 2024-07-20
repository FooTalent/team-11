package com.dev.foo.footalentpet.repository;

import com.dev.foo.footalentpet.model.entity.Post;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.PostRequestDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID>, JpaSpecificationExecutor<Post> {
    List<Post> findByUser(User user);
}
