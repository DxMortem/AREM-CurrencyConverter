package co.edu.escuelaing.arem.backend.controller;


import co.edu.escuelaing.arem.backend.service.BackendException;
import co.edu.escuelaing.arem.backend.service.CacheService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:8080")
public class CacheController {
    @Autowired
    private CacheService cacheService;

    private ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "currencies", method = RequestMethod.GET)
    public ResponseEntity<?> getCurrencies(){
        try {
            return new ResponseEntity<>(mapper.writeValueAsString(cacheService.getSupportedCurrencies()), HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "rates", method = RequestMethod.GET)
    public ResponseEntity<?> getRates(){
        try {
            return new ResponseEntity<>(mapper.writeValueAsString(cacheService.getRates()), HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "updated", method = RequestMethod.GET)
    public ResponseEntity<?> getUpdated(){
        try {
            cacheService.updateCache();
            ConcurrentHashMap<String, ConcurrentHashMap<String,?>> concurrentHashMap = new ConcurrentHashMap<>();
            concurrentHashMap.put("currencies", cacheService.getSupportedCurrencies());
            concurrentHashMap.put("rates", cacheService.getRates());
            return new ResponseEntity<>(mapper.writeValueAsString(concurrentHashMap),HttpStatus.OK);
        } catch (BackendException e) {
            System.err.println("BackendException");
            if (e.getMessage().equals("Same timestamp")){
                return new ResponseEntity<>("It's not possible to update yet", HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (JsonProcessingException e) {
            System.err.println("JsonProcessingException");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
