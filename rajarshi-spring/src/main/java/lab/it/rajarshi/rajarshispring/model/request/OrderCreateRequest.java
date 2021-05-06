package lab.it.rajarshi.rajarshispring.model.request;

import java.util.List;

import lombok.Value;

@Value
public class OrderCreateRequest {
    // Products in cart.
    List<Long> productIds;
    
    // Basic shipping info.
    String emailAddress;
    String mobileNumber;
    String firstName;
    String lastName;
    String address;
    String city;
    String state;
    String country;
    String zipCode;

    // Delivery method.
    String deliveryMethod;
    
    // Payment details.
    String cardNumber;
    String cardCvv;
    String cardExpiration;
    String cardFirstName;
    String cardLastName;
    Double totalCost;
}
