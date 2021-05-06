package lab.it.rajarshi.rajarshispring.datastore;

import java.util.List;
import java.util.Optional;

import lab.it.rajarshi.rajarshispring.model.Product;

public interface ProductRepository {

    List<Product> getProducts();
    
    Optional<Product> getProduct(Long id);

}
