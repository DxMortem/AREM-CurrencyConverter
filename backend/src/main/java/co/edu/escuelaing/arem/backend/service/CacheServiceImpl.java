package co.edu.escuelaing.arem.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CacheServiceImpl implements CacheService {

    private ConcurrentHashMap<String, String> currencies = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, Double> rates = new ConcurrentHashMap<>();
    private int timestamp;
    private ObjectMapper mapper = new ObjectMapper();
    private RestTemplate request = new RestTemplate();

    @Override
    public void updateCache() throws BackendException {

        try {
            Map<String, Object> map = new ConcurrentHashMap<>();
            String json = request.getForObject("http://apilayer.net/api/live?access_key=7ccbbef0073fa8bef534a8f200619aad&format=1", String.class);
            System.out.println(json);
            map = mapper.readValue(json, new TypeReference<Map<String, Object>>() {
            });
            System.out.println(map.get("timestamp"));
            if ((int) map.get("timestamp") == timestamp || map.get("timestamp") == null) {
                System.out.println("Same timestamp");
                throw new BackendException("Same timestamp");
            } else {
                System.out.println(map.get("timestamp"));
                timestamp = (int) map.get("timestamp");
                rates = new ConcurrentHashMap<>((Map<String, Double>) map.get("quotes"));
                System.out.println(map.get("quotes").toString());
                json = request.getForObject("http://apilayer.net/api/list?access_key=7ccbbef0073fa8bef534a8f200619aad&format=1", String.class);
                System.out.println(json);
                map = mapper.readValue(json, new TypeReference<Map<String, Object>>() {
                });
                currencies = new ConcurrentHashMap<>((Map<String, String>) map.get("currencies"));
            }
        } catch (IOException e) {
            System.out.println("Error with get method");
            throw new BackendException("Error with get method");
        }
    }

    @Override
    public ConcurrentHashMap<String, String> getSupportedCurrencies() {
        return currencies;
    }

    @Override
    public ConcurrentHashMap<String, Double> getRates() {
        return rates;
    }
}
