package ex4src.form;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Pizza {
    private static final AtomicInteger count = new AtomicInteger(0);
    private int pizzaId;
    private String dough;
    private String size;
    private List<String> toppings;

    public Pizza() {
        this.pizzaId = count.incrementAndGet();
    }

    // Constructor
    public Pizza(String dough, String size, List<String> toppings) {
        this.pizzaId = count.incrementAndGet();
        this.dough = dough;
        this.size = size;
        this.toppings = toppings;
    }

    // Getters and Setters
    public int getPizzaId() {
        return pizzaId;
    }

    public String getDough() {
        return dough;
    }

    public void setDough(String dough) {
        this.dough = dough;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public List<String> getToppings() {
        return toppings;
    }

    public void setToppings(List<String> toppings) {
        this.toppings = toppings;
    }

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
