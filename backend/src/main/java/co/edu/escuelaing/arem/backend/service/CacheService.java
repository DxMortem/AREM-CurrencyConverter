package co.edu.escuelaing.arem.backend.service;

import java.util.concurrent.ConcurrentHashMap;

public interface CacheService {
    void updateCache() throws BackendException;
    ConcurrentHashMap<String, String> getSupportedCurrencies();
    ConcurrentHashMap<String, Double> getRates();
}
