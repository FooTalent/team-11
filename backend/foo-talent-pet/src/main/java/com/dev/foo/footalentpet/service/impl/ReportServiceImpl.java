package com.dev.foo.footalentpet.service.impl;

import com.dev.foo.footalentpet.exception.NotFoundException;
import com.dev.foo.footalentpet.model.entity.Comment;
import com.dev.foo.footalentpet.model.entity.User;
import com.dev.foo.footalentpet.model.request.ReportRequestDTO;
import com.dev.foo.footalentpet.repository.CommentRepository;
import com.dev.foo.footalentpet.service.EmailService;
import com.dev.foo.footalentpet.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private EmailService emailService;
    @Autowired
    private CommentRepository commentRepository;
    @Value("${frontend.url}")
    private String frontendUrl;


    @Override
    public void generatePostReport(ReportRequestDTO reportRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        String message = "<h1>Reporte de " + currentUser.getName() + "</h1>"
                + "<p>El usuario " + currentUser.getName() + " ha reportado la publicacion: </p>" +
                "<p> " + frontendUrl + "post/" + reportRequestDTO.id() +
                "<p>Por la siguiente razón:</p>"
                + "<p>" + reportRequestDTO.message() + "</p>";
        emailService.sendHtmlMessage("petquest11@gmail.com", "Reporte de " + currentUser.getName(), message);
    }

    @Override
    public void generateCommentReport(ReportRequestDTO reportRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Comment comment = commentRepository.findById(reportRequestDTO.id())
                .orElseThrow(() -> new NotFoundException("Comment not found"));

        String message = "<h1>Reporte de " + currentUser.getName() + "</h1>"
                + "<p>El usuario " + currentUser.getName() + " ha reportado el comentario con el id: " + reportRequestDTO.id() + "</p>" +
                "<p>De la siguiente publicacion: </p>" +
                "<p> " + frontendUrl + "post/" + comment.getPost().getId() +
                "<p>Por la siguiente razón:</p>"
                + "<p>" + reportRequestDTO.message() + "</p>";
        emailService.sendHtmlMessage("adriandelosreyes2013@gmail.com", "Reporte de " + currentUser.getName(), message);
    }
}
