package projectbackend.common;

public interface IEmailService {
    boolean sendEmail(String receiptEmail, String link);
}
