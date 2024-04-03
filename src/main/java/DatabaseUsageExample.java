import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class DatabaseUsageExample {
    public static void main(String[] args) {
        try (Connection conn = DatabaseConnector.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM Hotel")) {

            while (rs.next()) {
                System.out.println(rs.getString("hotel_id"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
