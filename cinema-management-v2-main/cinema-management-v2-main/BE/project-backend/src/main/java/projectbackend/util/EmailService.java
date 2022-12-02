package projectbackend.util;

public interface EmailService {
    boolean sendEmail(String receiptEmail, String link);
}
