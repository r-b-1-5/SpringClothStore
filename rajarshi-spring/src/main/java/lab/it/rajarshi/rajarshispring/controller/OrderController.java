package lab.it.rajarshi.rajarshispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lab.it.rajarshi.rajarshispring.datastore.OrderRepository;
import lab.it.rajarshi.rajarshispring.model.User;
import lab.it.rajarshi.rajarshispring.model.request.OrderCreateRequest;

@RestController
// @CrossOrigin
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping(path = "/orders", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderCreateRequest> createOrder(@RequestBody OrderCreateRequest orderCreateRequest) {
        if (orderRepository.createOrder(orderCreateRequest, User.of(1L, "xd", "password"))) {
            return ResponseEntity.ok(orderCreateRequest);
        }

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not save to datastore.");
    }

}
