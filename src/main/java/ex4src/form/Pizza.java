package ex4src.form;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
/**
 * The {@code Pizza} class represents a pizza with specific attributes
 * such as dough type, size, and toppings. Each pizza is assigned a unique ID.
 */
public class Pizza {
    private static final AtomicInteger count = new AtomicInteger(0);
    private int pizzaId;
    private String dough;
    private String size;
    private List<String> toppings;
    /**
     * Default constructor that initializes the pizza with a unique ID.
     */
    public Pizza() {
        this.pizzaId = count.incrementAndGet();
    }
    /**
     * Constructs a {@code Pizza} with the specified dough type, size, and toppings.
     *
     * @param dough the type of dough
     * @param size the size of the pizza
     * @param toppings the list of toppings on the pizza
     */
    // Constructor
    public Pizza(String dough, String size, List<String> toppings) {
        this.pizzaId = count.incrementAndGet();
        this.dough = dough;
        this.size = size;
        this.toppings = toppings;
    }
    /**
     * Returns the pizza ID.
     *
     * @return the pizza ID
     */
    // Getters and Setters
    public int getPizzaId() {
        return pizzaId;
    }
    /**
     * Returns the type of dough.
     *
     * @return the type of dough
     */
    public String getDough() {
        return dough;
    }
    /**
     * Sets the type of dough.
     *
     * @param dough the new type of dough
     */
    public void setDough(String dough) {
        this.dough = dough;
    }
    /**
     * Returns the size of the pizza.
     *
     * @return the size of the pizza
     */
    public String getSize() {
        return size;
    }
    /**
     * Sets the size of the pizza.
     *
     * @param size the new size of the pizza
     */
    public void setSize(String size) {
        this.size = size;
    }
    /**
     * Returns the list of toppings on the pizza.
     *
     * @return the list of toppings on the pizza
     */
    public List<String> getToppings() {
        return toppings;
    }
    /**
     * Sets the list of toppings on the pizza.
     *
     * @param toppings the new list of toppings on the pizza
     */
    public void setToppings(List<String> toppings) {
        this.toppings = toppings;
    }
    /**
     * Returns a string representation of the {@code Pizza}.
     *
     * @return a string representation of the {@code Pizza}
     */
    @Override
    public String toString() {
        return "Pizza{" +
                "pizzaId=" + pizzaId +
                ", dough='" + dough + '\'' +
                ", size='" + size + '\'' +
                ", toppings=" + toppings +
                '}';
    }
}
