package lab.it.rajarshi.rajarshispring.model.response;

import lombok.Value;

@Value(staticConstructor = "of")
public class ProductResponse {
    
    Long id;
    String name;
    String description;
    String category;
    Boolean isNewArrival;
    Double price;
    Double discountPercentage;
    Double reducedPrice;
    String imageUrl;
    String footnote;

}
