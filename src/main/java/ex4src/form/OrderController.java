package ex4src.form;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The {@code OrderController} class provides RESTful endpoints for managing orders.
 * It includes endpoints for creating, retrieving, updating, and deleting orders.
 */
@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final List<Order> orders = new ArrayList<>();
    /**
     * Creates a new order and adds it to the list of orders.
     *
     * @param order the order to be added
     * @return the added order
     */
    @PostMapping
    public Order saveOrder(@RequestBody Order order) {
        orders.add(order);
        return order;
    }
    /**
     * Retrieves an order by its ID.
     *
     * @param orderId the ID of the order to retrieve
     * @return the order with the specified ID, or {@code null} if no order is found
     */
    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        for (Order order : orders) {
            if (order.getOrderId() == orderId) {
                return order;
            }
        }
        return null;
    }
    /**
     * Updates an existing order with the specified ID.
     *
     * @param orderId the ID of the order to update
     * @param updatedOrder the updated order details
     * @return the updated order, or {@code null} if no order is found
     */
    @PutMapping("/{orderId}")
    public Order updateOrder(@PathVariable int orderId, @RequestBody Order updatedOrder) {
        for (Order order : orders) {
            if (order.getOrderId() == orderId) {
                order.setFirstName(updatedOrder.getFirstName());
                order.setLastName(updatedOrder.getLastName());
                order.setAddress(updatedOrder.getAddress());
                order.setPhone(updatedOrder.getPhone());
                order.setArrivalTime(updatedOrder.getArrivalTime());
                order.setCartItems(updatedOrder.getCartItems());
                return order;
            }
        }
        return null;
    }
    /**
     * Deletes an order with the specified ID.
     *
     * @param orderId the ID of the order to delete
     */
    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable int orderId) {
        orders.removeIf(order -> order.getOrderId() == orderId);
    }
}
