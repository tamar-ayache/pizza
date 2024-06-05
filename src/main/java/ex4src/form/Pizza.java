package ex4src.form;

import java.util.List;

public class Pizza {
    private String dough;
    private String size;
    private List<String> toppings;

    // Constructor
    public Pizza(String dough, String size, List<String> toppings) {
        this.dough = dough;
        this.size = size;
        this.toppings = toppings;
    }

    // Getters and Setters
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

    // Optional: Override toString() method for debugging purposes
    @Override
    public String toString() {
        return "Pizza{" +
                "dough='" + dough + '\'' +
                ", size='" + size + '\'' +
                ", toppings=" + toppings +
                '}';
    }
}
