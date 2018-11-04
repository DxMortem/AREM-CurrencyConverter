package co.edu.escuelaing.arem.backend.service;

public class BackendException extends Throwable {
    public BackendException(String message) {
        super(message);
    }

    public BackendException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
