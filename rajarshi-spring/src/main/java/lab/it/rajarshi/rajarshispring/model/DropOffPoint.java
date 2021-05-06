package lab.it.rajarshi.rajarshispring.model;

import lombok.Value;

@Value(staticConstructor = "of")
public class DropOffPoint {
    Double latitude;
    Double longitude;
    String address;
    String city;
    String state;
    String country;
    String zipCode;
    String contact;
}
