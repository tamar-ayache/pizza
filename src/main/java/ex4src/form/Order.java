package ex4src.form;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Order {
    private static final AtomicInteger count = new AtomicInteger(0);
    private int orderId;
    private String firstName;
    private String lastName;
    private Address address;
    private String phone;
    private String arrivalTime;
    private List<Pizza> cartItems;
    private static final List<Order> orders = new ArrayList<>();

    public Order() {
        this.orderId = count.incrementAndGet();
    }

    // Constructor
    public Order(String firstName, String lastName, Address address, String phone, String arrivalTime, List<Pizza> cartItems) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.arrivalTime = arrivalTime;
        this.cartItems = cartItems;

        // Add the order to the list
        orders.add(this);
    }

    public int getOrderId() {
        return orderId;
    }

    public static Order getOrderById(int id) {
        // Assuming 'orders' is a list of all orders, you can iterate over it to find the order with the given id
        for (Order order : orders) {
            if (order.getOrderId() == id) {
                return order;
            }
        }
        return null; // If no order with the given id is found
    }

    // Getters and Setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public List<Pizza> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<Pizza> cartItems) {
        this.cartItems = cartItems;
    }

    // Optional: Override toString() method for debugging purposes
    @Override
    public String toString() {
        return "Order{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address=" + address +
                ", phone='" + phone + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", cartItems=" + cartItems +
                '}';
    }
}
