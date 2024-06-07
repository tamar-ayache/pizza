package ex4src.form;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
/**
 * The {@code PizzaController} class provides RESTful endpoints for managing pizzas.
 * It includes endpoints for creating, retrieving, updating, and deleting pizzas.
 */
@RestController
@RequestMapping("/api/pizzas")
public class PizzaController {
    private List<Pizza> pizzas = new ArrayList<>();
    /**
     * Adds a new pizza to the list.
     *
     * @param pizza the pizza to be added
     * @return a {@code ResponseEntity} with the added pizza and HTTP status {@code CREATED}
     */
    @PostMapping
    public ResponseEntity<Pizza> addPizza(@RequestBody Pizza pizza) {
        pizzas.add(pizza);
        return new ResponseEntity<>(pizza, HttpStatus.CREATED);
    }
    /**
     * Retrieves the list of all pizzas.
     *
     * @return the list of all pizzas
     */
    @GetMapping
    public List<Pizza> getPizzas() {
        return pizzas;
    }
    /**
     * Retrieves a pizza by its ID.
     *
     * @param pizzaId the ID of the pizza to retrieve
     * @return a {@code ResponseEntity} with the pizza and HTTP status {@code OK} if found,
     * or HTTP status {@code NOT_FOUND} if not found
     */
    @GetMapping("/{pizzaId}")
    public ResponseEntity<Pizza> getPizzaById(@PathVariable int pizzaId) {
        Optional<Pizza> pizza = pizzas.stream()
                .filter(p -> p.getPizzaId() == pizzaId)
                .findFirst();

        return pizza.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    /**
     * Updates an existing pizza by its ID.
     *
     * @param pizzaId the ID of the pizza to update
     * @param updatedPizza the updated pizza details
     * @return a {@code ResponseEntity} with the updated pizza and HTTP status {@code OK} if found,
     * or HTTP status {@code NOT_FOUND} if not found
     */
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
    /**
     * Deletes a pizza by its ID.
     *
     * @param pizzaId the ID of the pizza to delete
     * @return a {@code ResponseEntity} with HTTP status {@code NO_CONTENT} if deleted,
     * or HTTP status {@code NOT_FOUND} if not found
     */
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
