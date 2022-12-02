package projectbackend.service.promotion.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import projectbackend.model.promotion.Promotion;
import projectbackend.repository.promotion.IPromotionRepository;
import projectbackend.service.promotion.IPromotionService;

import java.util.Optional;

@Service
public class PromotionService implements IPromotionService {
    @Autowired
    private IPromotionRepository iPromotionRepository;


    @Override
    public void savePromotion(Promotion promotion) {
        iPromotionRepository.savePromotion(promotion);
    }

    @Override
    public void updatePromotion(Promotion promotion) {
        iPromotionRepository.updatePromotion(promotion);
    }

    @Override
    public Page<Promotion> findAll(Pageable pageable, String name, String dateStart) {
        return iPromotionRepository.findAllPromotion(pageable, name, dateStart);
    }

    @Override
    public Optional<Promotion> findById(int id) {
        return iPromotionRepository.findPromotionById(id);
    }

    @Override
    public void delete(int id) {
        iPromotionRepository.deletePromotion(id);
    }

}
