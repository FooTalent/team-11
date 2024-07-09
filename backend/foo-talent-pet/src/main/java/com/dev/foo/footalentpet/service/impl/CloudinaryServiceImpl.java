package com.dev.foo.footalentpet.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dev.foo.footalentpet.service.CloudinaryService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(CloudinaryServiceImpl.class);
    Logger logger = Logger.getLogger(CloudinaryServiceImpl.class.getName());

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        Map params = ObjectUtils.asMap(
                "use_filename", true,
                "unique_filename", false,
                "overwrite", true
        );
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return (String) uploadResult.get("url");
    }

    @Override
    public List<String> uploadFiles(List<MultipartFile> files) throws IOException {
        return files.stream()
                .map(file -> {
                    try {
                        return uploadFile(file);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }
}
