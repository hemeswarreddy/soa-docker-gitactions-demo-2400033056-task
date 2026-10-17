package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.StorageUnit;
import com.klef.soa.exam.repository.StorageUnitRepository;

@Service
public class StorageUnitServiceImpl implements StorageUnitService {
    @Autowired
    private StorageUnitRepository repo;
    @Override
    public StorageUnit addstorageunit(StorageUnit storageUnit) {
        return repo.save(storageUnit);
    }

    @Override
    public String deletestorageunit(Long id) {
        if (repo.existsById(id))
        {
            repo.deleteById(id);
            return "ID deleted successfully";
        }

        return "ID not found to delete";
    }

    @Override
    public List<StorageUnit> displayallstorageUnits() {
        return repo.findAll();
    }
}