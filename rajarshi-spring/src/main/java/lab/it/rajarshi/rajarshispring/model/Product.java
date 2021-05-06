package lab.it.rajarshi.rajarshispring.model;

import lombok.Value;

@Value(staticConstructor = "of")
public class Product {

    Long id;
    String name;
    String description;
    String category;
    Boolean isNewArrival;
    Double price;
    Double discountPercentage;
    String imageUrl;
    String footnote;

}
