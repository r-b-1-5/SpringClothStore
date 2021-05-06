package lab.it.rajarshi.rajarshispring.controller;

import java.security.Key;
import java.util.Map;
import java.util.Optional;

import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.keys.HmacKey;
import org.jose4j.lang.JoseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lab.it.rajarshi.rajarshispring.model.User;
import lab.it.rajarshi.rajarshispring.model.request.TokenObtainRequest;

@RestController
// @CrossOrigin
@CrossOrigin(origins = "*")
public class TokenController {

    @PostMapping(path = "tokens/obtain", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> obtainToken(@RequestBody TokenObtainRequest tokenObtainRequest) {
        if (!tokenObtainRequest.getUsername().equals("xd") || !tokenObtainRequest.getPassword().equals("password")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid username/password.");
        }

        User user = User.of(1L, "xd", "password");

        String jwt = getJwt(user).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error."));

        return ResponseEntity.ok(Map.of("token", jwt));
    }

    private Optional<String> getJwt(User user) {
        JwtClaims claims = new JwtClaims();

        claims.setIssuer("flopkartApi");
        claims.setSubject(user.getUsername());
        claims.setExpirationTimeMinutesInTheFuture(60);
        claims.setGeneratedJwtId();
        claims.setIssuedAtToNow();
        claims.setNotBeforeMinutesInThePast(2);

        claims.setClaim("userId", user.getId());

        Key key = new HmacKey("secret".getBytes());

        JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(claims.toJson());
        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.HMAC_SHA256);
        jws.setKey(key);
        jws.setDoKeyValidation(false);

        try {
            return Optional.of(jws.getCompactSerialization());
        } catch (JoseException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

}
