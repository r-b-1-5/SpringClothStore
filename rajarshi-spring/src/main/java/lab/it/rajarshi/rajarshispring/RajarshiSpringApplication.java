package lab.it.rajarshi.rajarshispring;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import lab.it.rajarshi.rajarshispring.converter.Converter;
import lab.it.rajarshi.rajarshispring.converter.ProductToProductResponseConverter;
import lab.it.rajarshi.rajarshispring.datastore.DropOffPointRepository;
import lab.it.rajarshi.rajarshispring.datastore.JdbcDropOffPointRepository;
import lab.it.rajarshi.rajarshispring.datastore.JdbcOrderRepository;
import lab.it.rajarshi.rajarshispring.datastore.JdbcProductRepository;
import lab.it.rajarshi.rajarshispring.datastore.OrderRepository;
import lab.it.rajarshi.rajarshispring.datastore.ProductRepository;
import lab.it.rajarshi.rajarshispring.filter.OrderControllerAuthFilter;
import lab.it.rajarshi.rajarshispring.model.Product;
import lab.it.rajarshi.rajarshispring.model.response.ProductResponse;

// @Configuration
// @EnableWebSecurity
@SpringBootApplication
public class RajarshiSpringApplication {

	// @Bean
	// public ServletWebServerFactory servletContainer() {
	// 	TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
	// 	@Override
	// 	protected void postProcessContext(Context context) {
	// 		SecurityConstraint securityConstraint = new SecurityConstraint();
	// 		securityConstraint.setUserConstraint("CONFIDENTIAL");
	// 		SecurityCollection collection = new SecurityCollection();
	// 		collection.addPattern("/*");
	// 		securityConstraint.addCollection(collection);
	// 		context.addConstraint(securityConstraint); 
	// 		}
	// 	};
	// 	tomcat.addAdditionalTomcatConnectors(redirectConnector());
	// 	return tomcat; 
	// }
	// private Connector redirectConnector() {
	// 	Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
	// 	connector.setScheme("http");
	// 	connector.setPort(8080);
	// 	connector.setSecure(false);
	// 	connector.setRedirectPort(8443);
		
	// 	return connector;
	// }
	// & 'c:\Users\Asus\.vscode\extensions\vscjava.vscode-java-debug-0.33.1\scripts\launcher.bat' 'D:\Java\bin\java.exe' '--enable-preview' '-XX:+ShowCodeDetailsInExceptionMessages' '-Dfile.encoding=UTF-8' '@C:\Users\Asus\AppData\Local\Temp\cp_5e6wf96axq15kzx4oaayy35dz.argfile' 'SpringApplication'
	public static void main(String[] args) {
		SpringApplication.run(RajarshiSpringApplication.class, args);
	}

	@Bean
	@Autowired
	public ProductRepository productRepository(JdbcTemplate jdbcTemplate) {
		return new JdbcProductRepository(jdbcTemplate);
	}

	@Bean
	@Autowired
	public OrderRepository orderRepository(JdbcTemplate jdbcTemplate, ProductRepository productRepository) {
		return new JdbcOrderRepository(jdbcTemplate, productRepository);
	}

	@Bean
	@Autowired
	public DropOffPointRepository dropOffPointRepository(JdbcTemplate jdbcTemplate) {
		return new JdbcDropOffPointRepository(jdbcTemplate);
	}

	@Bean
	public Converter<Product, ProductResponse> productToProductResponseConverter() {
		return new ProductToProductResponseConverter();
	}

	@Bean
	public FilterRegistrationBean<OrderControllerAuthFilter> filterRegistrationBean() {
		FilterRegistrationBean<OrderControllerAuthFilter> registrationBean = new FilterRegistrationBean<>();
		OrderControllerAuthFilter orderControllerAuthFilter = new OrderControllerAuthFilter();

		registrationBean.setFilter(orderControllerAuthFilter);
		registrationBean.addUrlPatterns("/orders");
		registrationBean.setOrder(2);
		return registrationBean;
	}
}
