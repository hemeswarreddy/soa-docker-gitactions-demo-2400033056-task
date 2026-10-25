
package com.klef.soa.docker.controller;

import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;

import com.klef.soa.docker.entity.StorageUnit;
import com.klef.soa.docker.service.StorageUnitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/storageunit")
public class StorageUnitController {

    @Autowired
    private StorageUnitService service;

    @GetMapping("/")
    public String home() {
        return "This is home page";
    }

    @PostMapping("/add")
    public ResponseEntity<StorageUnit> addStorageUnit(@RequestBody StorageUnit storageUnit) {

        StorageUnit output = service.addstorageunit(storageUnit);
        return ResponseEntity.ok(output);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<StorageUnit>> displayAllStorageUnits() {

        List<StorageUnit> output = service.displayallstorageUnits();
        return ResponseEntity.ok(output);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStorageUnit(@PathVariable Long id) {

        String output = service.deletestorageunit(id);
        return ResponseEntity.ok(output);
    }
}


