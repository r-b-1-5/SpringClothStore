package lab.it.rajarshi.rajarshispring.model;

import lombok.Value;

// getters - To be able to return field values.
// toString method - To return a more readable string representation of our object.
// equals method - To check if 2 objects are equal.
// hashCode method - Simply returns a hash code value for the object.
// A constructor - A special constructor that takes one parameter for each final field with no initial value.
// Make Lombok Generate A Private Constructor

@Value(staticConstructor = "of")
public class User {
    
    Long id;
    String username;
    String password;

}
