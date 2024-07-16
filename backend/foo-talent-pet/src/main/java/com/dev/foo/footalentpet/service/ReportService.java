package com.dev.foo.footalentpet.service;

import com.dev.foo.footalentpet.model.request.ReportRequestDTO;

public interface ReportService {
    void generatePostReport(ReportRequestDTO reportRequestDTO);

    void generateCommentReport(ReportRequestDTO reportRequestDTO);
}
