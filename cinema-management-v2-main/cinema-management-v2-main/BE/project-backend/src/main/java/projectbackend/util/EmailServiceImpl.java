package projectbackend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService{
    @Autowired
    private JavaMailSender mailSender;
    @Override
    public boolean sendEmail(String receiptEmail, String link) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            helper.setFrom("c0522g1@gmail.com");
            helper.setTo(receiptEmail);
            String subject = "Đặt lại mật khẩu";
            String content = "<p>Hello,</p>"
                    + "<p>Nhấn vào link dưới đây để đặt lại mật khẩu:</p>"
                    + "<p>" + "<a href=\'" + link + "\'>Đặt lại mật khẩu</a>" + "</p>"
                    + "<br>"
                    + "<p>Bỏ qua email này nếu bạn nhớ mật khẩu của mình.</p>";
            helper.setSubject(subject);

            helper.setText(content, true);

            mailSender.send(message);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
