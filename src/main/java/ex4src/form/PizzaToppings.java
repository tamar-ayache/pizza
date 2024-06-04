package ex4src.form;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/toppings")
public class PizzaToppings {

    @GetMapping
    public List<String> getToppings() {
        // Implement logic to fetch toppings data from your data source (e.g., database, file)
        // For example, using a hardcoded list of toppings:
        return Arrays.asList("Olives", "Mushrooms", "Mozzarella", "Corn", "Pineapple", "Tomatoes", "Jalapeno");
    }
}
