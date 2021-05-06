package lab.it.rajarshi.rajarshispring.model.request;

import lombok.Value;

@Value(staticConstructor = "of")
public class TokenObtainRequest {

    String username;
    String password;
    
}
