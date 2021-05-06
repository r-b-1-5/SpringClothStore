package lab.it.rajarshi.rajarshispring.datastore;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import lab.it.rajarshi.rajarshispring.model.Product;
import lab.it.rajarshi.rajarshispring.utils.ResultSetUtilities;

public class JdbcProductRepository implements ProductRepository {

    private static String LIST_PRODUCTS_SQL = 
        "SELECT "
            + "product.id, product_name, product_description, category_name, new_arrival.id as new_arrival_id, "
            + "price, discount.id as discount_id, discount_percentage, image_file_url, footnote "
        + "FROM product "
        + "INNER JOIN category "
        + "ON product.category_id = category.id "
        + "LEFT JOIN discount "
        + "ON product.id = discount.product_id "
        + "LEFT JOIN new_arrival "
        + "ON product.id = new_arrival.product_id;";
    
    private static String RETRIEVE_PRODUCT_SQL = 
        "SELECT "
            + "product.id, product_name, product_description, category_name, new_arrival.id as new_arrival_id, "
            + "price, discount.id as discount_id, discount_percentage, image_file_url, footnote "
        + "FROM product "
        + "INNER JOIN category "
        + "ON product.category_id = category.id "
        + "LEFT JOIN discount "
        + "ON product.id = discount.product_id "
        + "LEFT JOIN new_arrival "
        + "ON product.id = new_arrival.product_id "
        + "WHERE product.id = ?;";

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Product> getProducts() {
        return jdbcTemplate.query(LIST_PRODUCTS_SQL, (rs, rowNum) -> constructProduct(rs));
    }

    @Override
    public Optional<Product> getProduct(Long id) {
        try {
            return Optional.of(
                jdbcTemplate.queryForObject(RETRIEVE_PRODUCT_SQL, (rs, rowNum) -> constructProduct(rs), id)
            );
        } catch (DataAccessException e) {
            return Optional.empty();
        }
    }

    private Product constructProduct(ResultSet rs) throws SQLException {
        Boolean isNewArrival = ResultSetUtilities.getLongObject(rs, "new_arrival_id") != null;

        return Product.of(
            rs.getLong("id"), 
            rs.getString("product_name"), 
            rs.getString("product_description"), 
            rs.getString("category_name"), 
            isNewArrival, 
            rs.getDouble("price"),
            rs.getDouble("discount_percentage"), 
            rs.getString("image_file_url"),
            rs.getString("footnote")
        );
    }
    
}
