package ex4src.form;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/sizes")
public class PizzaSize {

    @GetMapping
    public List<String> getSizes() {
        // Implement logic to fetch sizes data from your data source (e.g., database, file)
        // For example, using a hardcoded list of sizes:
        return Arrays.asList("Small", "Medium", "Large", "Extra Large");
    }
}
