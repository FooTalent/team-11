package com.dev.foo.footalentpet.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class CloudinaryServiceImpl {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(CloudinaryServiceImpl.class);
    Logger logger = Logger.getLogger(CloudinaryServiceImpl.class.getName());

    @Autowired
    private Cloudinary cloudinary;


    public String uploadFile(MultipartFile file) throws IOException {
        Map params = ObjectUtils.asMap(
                "use_filename", true,
                "unique_filename", false,
                "overwrite", true
        );
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        logger.info(uploadResult.get("public_id").toString());
        logger.info(uploadResult.get("url").toString());
        return (String) uploadResult.get("url");
    }
}
