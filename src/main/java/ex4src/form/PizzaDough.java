package ex4src.form;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/doughs")
public class PizzaDough {

    @GetMapping
    public List<String> getDoughs() {
        // Implement logic to fetch doughs data from your data source (e.g., database, file)
        // For example, using a hardcoded list of doughs:
        return Arrays.asList("Classic Dough",
                "Whole Wheat Dough",
                "Gluten-Free Dough",
                "Sourdough",
                "Thin Crust Dough",
                "Thick Crust Dough",
                "Stuffed Crust Dough");
    }
}
