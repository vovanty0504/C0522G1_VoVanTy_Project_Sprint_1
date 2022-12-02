package projectbackend.service.promotion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import projectbackend.model.promotion.Promotion;

import java.util.Optional;

public interface IPromotionService {
    void savePromotion(Promotion promotion);

    void updatePromotion(Promotion promotion);

    Page<Promotion> findAll(Pageable pageable, String name,String dateStart);

    Optional<Promotion> findById(int id);

    void delete(int id);

}
