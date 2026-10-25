package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.entity.StorageUnit;

public interface StorageUnitService {
    StorageUnit addstorageunit(StorageUnit storageUnit);
    String deletestorageunit(Long id);
    List<StorageUnit> displayallstorageUnits();
}