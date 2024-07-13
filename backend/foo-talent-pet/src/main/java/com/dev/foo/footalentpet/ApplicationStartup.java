package com.dev.foo.footalentpet;

import com.dev.foo.footalentpet.model.request.TagRequestDTO;
import com.dev.foo.footalentpet.service.ColorService;
import com.dev.foo.footalentpet.service.LocationService;
import com.dev.foo.footalentpet.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {
    @Value("${server.port:8080}")
    private String serverPort;

    @Value("${springdoc.swagger-ui.path}")
    private String apiDocsPath;

    @Autowired
    private TagService tagService;
    @Autowired
    private ColorService colorService;

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        System.out.println("Documentation available on: http://localhost:" + serverPort + "/api" + apiDocsPath);

        tagService.createTags();
        colorService.createColors();
    }
}