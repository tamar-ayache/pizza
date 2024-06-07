package ex4src.form;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * The {@code Order} class represents a customer's order.
 * It includes information about the customer, their address, contact details,
 * arrival time, and a list of pizzas in the cart. It also assigns a unique order ID to each order.
 */
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
    /**
     * Default constructor that initializes the order with a unique ID.
     */
    public Order() {
        this.orderId = count.incrementAndGet();
    }
    /**
     * Constructs an {@code Order} with the specified details and adds it to the list of orders.
     *
     * @param firstName   the first name of the customer
     * @param lastName    the last name of the customer
     * @param address     the address of the customer
     * @param phone       the phone number of the customer
     * @param arrivalTime the arrival time of the order
     * @param cartItems   the list of pizzas in the cart
     */
    public Order(String firstName, String lastName, Address address, String phone, String arrivalTime, List<Pizza> cartItems) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.arrivalTime = arrivalTime;
        this.cartItems = cartItems;
        orders.add(this);
    }
    /**
     * Returns the order ID.
     *
     * @return the order ID
     */
    public int getOrderId() {
        return orderId;
    }

    /**
     * Retrieves an order by its ID.
     *
     * @param id the order ID
     * @return the order with the specified ID, or {@code null} if no order is found
     */
    public static Order getOrderById(int id) {
        for (Order order : orders) {
            if (order.getOrderId() == id) {
                return order;
            }
        }
        return null;
    }
    /**
     * Returns the first name of the customer.
     *
     * @return the first name of the customer
     */
    public String getFirstName() {
        return firstName;
    }
    /**
     * Sets the first name of the customer.
     *
     * @param firstName the new first name of the customer
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    /**
     * Returns the last name of the customer.
     *
     * @return the last name of the customer
     */
    public String getLastName() {
        return lastName;
    }
    /**
     * Sets the last name of the customer.
     *
     * @param lastName the new last name of the customer
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    /**
     * Returns the address of the customer.
     *
     * @return the address of the customer
     */
    public Address getAddress() {
        return address;
    }
    /**
     * Sets the address of the customer.
     *
     * @param address the new address of the customer
     */
    public void setAddress(Address address) {
        this.address = address;
    }
    /**
     * Returns the phone number of the customer.
     *
     * @return the phone number of the customer
     */
    public String getPhone() {
        return phone;
    }
    /**
     * Sets the phone number of the customer.
     *
     * @param phone the new phone number of the customer
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }
    /**
     * Returns the arrival time of the order.
     *
     * @return the arrival time of the order
     */
    public String getArrivalTime() {
        return arrivalTime;
    }
    /**
     * Sets the arrival time of the order.
     *
     * @param arrivalTime the new arrival time of the order
     */
    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
    /**
     * Returns the list of pizzas in the cart.
     *
     * @return the list of pizzas in the cart
     */
    public List<Pizza> getCartItems() {
        return cartItems;
    }
    /**
     * Sets the list of pizzas in the cart.
     *
     * @param cartItems the new list of pizzas in the cart
     */
    public void setCartItems(List<Pizza> cartItems) {
        this.cartItems = cartItems;
    }
    /**
     * Returns a string representation of the {@code Order}.
     *
     * @return a string representation of the {@code Order}
     */
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
