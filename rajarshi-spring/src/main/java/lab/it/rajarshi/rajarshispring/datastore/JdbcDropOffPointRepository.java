package lab.it.rajarshi.rajarshispring.datastore;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import lab.it.rajarshi.rajarshispring.model.DropOffPoint;

public class JdbcDropOffPointRepository implements DropOffPointRepository {

    private static String LIST_DROP_OFF_POINTS_SQL = "SELECT * FROM drop_off_point;";

    private static String LIST_DROP_OFF_POINTS_PARAMETERIZED_SQL = 
        "SELECT *, ((latitude-?)*(latitude-?)+(longitude-?)*(longitude-?)) AS d " +
        "FROM drop_off_point " +
        "ORDER BY d " +
        "LIMIT ?;";

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcDropOffPointRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<DropOffPoint> getDropOffPoints() {
        return jdbcTemplate.query(LIST_DROP_OFF_POINTS_SQL, (rs, rowNum) -> constructDropOffPoint(rs));
    }

    @Override
    public List<DropOffPoint> getDropOffPoints(double sourceLatitude, double sourceLongitude, int maxItems) {
        return jdbcTemplate.query(
            LIST_DROP_OFF_POINTS_PARAMETERIZED_SQL, 
            (rs, rowNum) -> constructDropOffPoint(rs), 
            sourceLatitude, sourceLatitude, sourceLongitude, sourceLongitude, maxItems
        );
    }

    private DropOffPoint constructDropOffPoint(ResultSet rs) throws SQLException {
        return DropOffPoint.of(
            rs.getDouble("latitude"), 
            rs.getDouble("longitude"), 
            rs.getString("_address"),
            rs.getString("city"),    
            rs.getString("state"), 
            rs.getString("country"), 
            rs.getString("zip_code"), 
            rs.getString("contact")
        );
    }
}
