package ex4src.form;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
/**
 * The {@code PizzaSize} class provides a RESTful endpoint for retrieving different sizes of pizzas.
 */
@RestController
@RequestMapping("/api/sizes")

public class PizzaSize {
    /**
     * Retrieves a list of available pizza sizes.
     *
     * @return a list of pizza sizes
     */
    @GetMapping
    public List<String> getSizes() {
        // Implement logic to fetch sizes data from your data source (e.g., database, file)
        // For example, using a hardcoded list of sizes:
        return Arrays.asList("Small", "Medium", "Large", "Extra Large");
    }
}
