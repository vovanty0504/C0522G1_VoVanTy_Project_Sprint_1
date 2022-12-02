package projectbackend.controller;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import projectbackend.dto.promotion.PromotionDto;
import projectbackend.model.promotion.Promotion;
import projectbackend.service.promotion.IPromotionService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/promotion")
@CrossOrigin("*")
public class PromotionRestController {
    @Autowired
    private IPromotionService iPromotionService;

    @PostMapping("/save")
    public ResponseEntity<List<FieldError>> createPromotion(@RequestBody @Valid PromotionDto promotionDto,
                                                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        }
        Promotion promotion = new Promotion();
        BeanUtils.copyProperties(promotionDto, promotion);
        System.out.println(promotion);
        iPromotionService.savePromotion(promotion);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Promotion> editPromotion(@RequestBody @Valid PromotionDto promotionDto,
                                                   BindingResult bindingResult,
                                                   @PathVariable Integer id) {
        Promotion promotion = new Promotion();
        BeanUtils.copyProperties(promotionDto, promotion);
        promotion.setId(id);
        iPromotionService.updatePromotion(promotion);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Promotion> getInfo(@PathVariable int id) {
        Optional<Promotion> promotion = iPromotionService.findById(id);
        if (promotion.isPresent()) {
            return new ResponseEntity<>(promotion.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Promotion> delete(@PathVariable int id) {
        Optional<Promotion> promotion = iPromotionService.findById(id);
        if (promotion.isPresent()) {
            iPromotionService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Promotion>> showPromotion(@RequestParam(value = "name", defaultValue = "") String name,
                                                         @RequestParam(value = "dateStart", defaultValue = "") String dateStart,
                                                         @PageableDefault(value = 4) Pageable pageable,
                                                         HttpServletRequest request) {
        Page<Promotion> promotions = iPromotionService.findAll(pageable, name, dateStart);
        if (promotions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(promotions, HttpStatus.OK);
        }
    }
}
