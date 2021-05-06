package lab.it.rajarshi.rajarshispring.utils;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetUtilities {

    public static Long getLongObject(ResultSet rs, String columnName) throws SQLException {
        long value = rs.getLong(columnName);
        if (rs.wasNull()) return null;
        return Long.valueOf(value);
    }

    public static Double getDoubleObject(ResultSet rs, String columnName) throws SQLException {
        double value = rs.getDouble(columnName);
        if (rs.wasNull()) return null;
        return Double.valueOf(value);
    }
    
}
