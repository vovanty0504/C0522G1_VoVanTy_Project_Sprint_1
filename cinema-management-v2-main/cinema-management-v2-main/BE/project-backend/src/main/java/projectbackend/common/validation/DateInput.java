package projectbackend.common.validation;

import projectbackend.dto.movie.MovieFullDto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class DateInput {

    public boolean validateInput(MovieFullDto movieFullDto) {
        Date dateNow = new Date();
        System.out.println(dateNow);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date startDateInput;
        Date endDateInput;
        boolean isValid = false;
        try {
            startDateInput = sdf.parse(movieFullDto.getStartDay());
            endDateInput = sdf.parse(movieFullDto.getEndDay());
            long diff = TimeUnit.DAYS.convert(startDateInput.getTime() - dateNow.getTime(), TimeUnit.MILLISECONDS);
            long diff1 = TimeUnit.DAYS.convert(endDateInput.getTime() - startDateInput.getTime(), TimeUnit.MILLISECONDS);
            if (diff >= 0 && diff1 >= 0) {
                isValid = true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return isValid;
    }
}
