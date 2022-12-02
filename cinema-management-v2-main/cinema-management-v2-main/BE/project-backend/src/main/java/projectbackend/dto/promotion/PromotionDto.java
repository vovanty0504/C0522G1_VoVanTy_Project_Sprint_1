package projectbackend.dto.promotion;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class PromotionDto {
    private Integer id;

    @NotBlank(message = "Vui lòng nhập tên tiêu đề")
    @Pattern(regexp = "^([A-Z][^@*&%#!<>]+[ ][^@*&%#!<>]+)$")
    @Size(max = 150)
    private String name;

    private boolean isDelete;

//    @NotBlank(message = "Vui lòng chọn hình ảnh")
    private String image;

//    @NotBlank(message = "Vui lòng nhập thời gian bắt đầu")
//    @Pattern(regexp = "^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[0-1])| *$", message = "Vui lòng nhập đúng định dạng dd/mm/yy")
    private String startTime;

//    @NotBlank(message = "Vui lòng nhập thời gian kết thúc")
//    @Pattern(regexp = "^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[0-1])| *$", message = "Vui lòng nhập đúng định dạng dd/mm/yy")
    private String endTime;

    @NotBlank(message = "Vui lòng nhập tên tiêu đề")
    @Pattern(regexp = "^([A-Z][^@*&%#!<>]+[ ][^@*&%#!<>]+)$")
    @Size(max = 1000)
    private String detail;

//    @NotBlank(message = "Vui lòng nhập vào giảm giá")
//    @Pattern(regexp = "^[0-9]+$", message = "Vui lòng nhập đúng định dạng số!")
    private int discount;

    public PromotionDto() {
    }

    public PromotionDto(Integer id, String name, boolean isDelete, String image, String startTime, String endTime, String detail, int discount) {
        this.id = id;
        this.name = name;
        this.isDelete = isDelete;
        this.image = image;
        this.startTime = startTime;
        this.endTime = endTime;
        this.detail = detail;
        this.discount = discount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }
}
