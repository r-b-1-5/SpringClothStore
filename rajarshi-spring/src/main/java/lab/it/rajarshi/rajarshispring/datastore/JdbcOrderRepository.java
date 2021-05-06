package lab.it.rajarshi.rajarshispring.datastore;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.transaction.annotation.Transactional;

import lab.it.rajarshi.rajarshispring.model.User;
import lab.it.rajarshi.rajarshispring.model.request.OrderCreateRequest;

public class JdbcOrderRepository implements OrderRepository {

    private final JdbcTemplate jdbcTemplate;
    private final ProductRepository productRepository;

    private static String CREATE_ORDER_SQL = 
        "INSERT INTO order_detail " +
            "(" +
                "email_address, mobile_number, first_name, last_name, " + 
                "shipping_address, shipping_city, shipping_state, shipping_country, shipping_zip_code, " +
                "delivery_method, " +
                "card_number, card_cvv, card_expiration, card_first_name, card_last_name, total_cost, " +
                "user_id" +
            ")" +
        "VALUES " +
            "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    private static String CREATE_ORDER_ITEM_SQL = 
        "INSERT INTO order_item " +
            "(order_detail_id, product_id) " +
        "VALUES " +
            "(?, ?);";

    public JdbcOrderRepository(JdbcTemplate jdbcTemplate, ProductRepository productRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.productRepository = productRepository;
    }

    @Override
    public boolean createOrder(OrderCreateRequest orderCreateRequest, User user) {
        try {
            createOrderDelegate(orderCreateRequest, user);
        } catch (DataAccessException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

                                                                                                                                                                            @Transactional
    private void createOrderDelegate(OrderCreateRequest orderCreateRequest, User user) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(CREATE_ORDER_SQL);
            setOrderDetails(orderCreateRequest, user, ps);
            return ps;
        }, keyHolder);

        Long orderId = keyHolder.getKey().longValue();

        createOrderItemsDelegate(orderId, orderCreateRequest.getProductIds());
    }

    @Override
    public boolean createOrderItems(Long orderId, List<Long> productIds) {
        // TODO Auto-generated method stub
        return false;
    }

                                                                                                                                                                                                                                        @Transactional
    public void createOrderItemsDelegate(Long orderId, List<Long> productIds) {
        productIds.stream().forEach(productId -> jdbcTemplate.update(CREATE_ORDER_ITEM_SQL, orderId, productId));
    }

    private void setOrderDetails(
            OrderCreateRequest orderCreateRequest, 
            User user, 
            PreparedStatement preparedStatement
    ) throws SQLException {
        preparedStatement.setString(1, orderCreateRequest.getEmailAddress());
        preparedStatement.setString(2, orderCreateRequest.getMobileNumber());
        preparedStatement.setString(3, orderCreateRequest.getFirstName());
        preparedStatement.setString(4, orderCreateRequest.getLastName());
        preparedStatement.setString(5, orderCreateRequest.getAddress());
        preparedStatement.setString(6, orderCreateRequest.getCity());
        preparedStatement.setString(7, orderCreateRequest.getState());
        preparedStatement.setString(8, orderCreateRequest.getCountry());
        preparedStatement.setString(9, orderCreateRequest.getZipCode());

        preparedStatement.setString(10, orderCreateRequest.getDeliveryMethod());

        preparedStatement.setString(11, orderCreateRequest.getCardNumber());
        preparedStatement.setString(12, orderCreateRequest.getCardCvv());
        preparedStatement.setString(13, orderCreateRequest.getCardExpiration());
        preparedStatement.setString(14, orderCreateRequest.getCardFirstName());
        preparedStatement.setString(15, orderCreateRequest.getCardLastName());


        Double totalCost = orderCreateRequest.getProductIds().stream()
            .mapToDouble(productId -> productRepository.getProduct(productId).orElseThrow().getPrice())
            .sum();
        preparedStatement.setDouble(16, totalCost);

        preparedStatement.setLong(17, user.getId());
    }
    
}


























// @Transactional should be used on specific methods where it is actually needed, not on the entire class. This makes it easier to see which methods are meant to be executed as one transaction, and which ones are not. You don't need @Transactional for database operations that only read from the database.