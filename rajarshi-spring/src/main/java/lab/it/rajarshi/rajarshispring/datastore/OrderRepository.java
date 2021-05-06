package lab.it.rajarshi.rajarshispring.datastore;

import java.util.List;

import lab.it.rajarshi.rajarshispring.model.User;
import lab.it.rajarshi.rajarshispring.model.request.OrderCreateRequest;

public interface OrderRepository {
    
    boolean createOrder(OrderCreateRequest orderCreateRequest, User user);

    boolean createOrderItems(Long orderId, List<Long> productIds);

}
