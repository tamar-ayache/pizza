package ex4src.form;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pizzas")
public class PizzaController {
    private List<Pizza> pizzas = new ArrayList<>();

    @PostMapping
    public ResponseEntity<Pizza> addPizza(@RequestBody Pizza pizza) {
        pizzas.add(pizza);
        return new ResponseEntity<>(pizza, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Pizza> getPizzas() {
        return pizzas;
    }

    @GetMapping("/{pizzaId}")
    public ResponseEntity<Pizza> getPizzaById(@PathVariable int pizzaId) {
        Optional<Pizza> pizza = pizzas.stream()
                .filter(p -> p.getPizzaId() == pizzaId)
                .findFirst();

        return pizza.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{pizzaId}")
    public ResponseEntity<Pizza> updatePizza(@PathVariable int pizzaId, @RequestBody Pizza updatedPizza) {
        Optional<Pizza> existingPizzaOptional = pizzas.stream()
                .filter(pizza -> pizza.getPizzaId() == pizzaId)
                .findFirst();

        if (existingPizzaOptional.isPresent()) {
            Pizza existingPizza = existingPizzaOptional.get();
            existingPizza.setDough(updatedPizza.getDough());
            existingPizza.setSize(updatedPizza.getSize());
            existingPizza.setToppings(updatedPizza.getToppings());
            return new ResponseEntity<>(existingPizza, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{pizzaId}")
    public ResponseEntity<Void> deletePizza(@PathVariable int pizzaId) {
        boolean removed = pizzas.removeIf(pizza -> pizza.getPizzaId() == pizzaId);
        if (removed) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
