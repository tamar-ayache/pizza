package ex4src.form;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.Arrays;
/**
 * The {@code PizzaToppings} class provides a RESTful endpoint for retrieving different types of pizza toppings.
 */
@RestController
@RequestMapping("/api/toppings")
public class PizzaToppings {
    /**
     * Retrieves a list of available pizza toppings.
     *
     * @return a list of pizza toppings
     */
    @GetMapping
    public List<String> getToppings() {
        // Implement logic to fetch toppings data from your data source (e.g., database, file)
        // For example, using a hardcoded list of toppings:
        return Arrays.asList("Olives", "Mushrooms", "Mozzarella", "Corn", "Pineapple", "Tomatoes", "Jalapeno");
    }
}
