package ex4src.form;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    public Order getOrderById(@PathVariable UUID orderId) {
        for (Order order : orders) {
            if (order.getOrderId().equals(orderId)) {
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
    public ResponseEntity<?> updateOrder(@PathVariable UUID orderId, @RequestBody Order updatedOrder) {
        for (Order order : orders) {
            if (order.getOrderId().equals(orderId)) {
                if (updatedOrder.getFirstName() == null || updatedOrder.getFirstName().isEmpty()) {
                    return new ResponseEntity<>("first name type is mandatory", HttpStatus.BAD_REQUEST);
                }
                if (updatedOrder.getLastName() == null || updatedOrder.getLastName().isEmpty()) {
                    return new ResponseEntity<>("last name type is mandatory", HttpStatus.BAD_REQUEST);
                }
                if (updatedOrder.getAddress().getCity() == null || updatedOrder.getAddress().getCity().isEmpty()) {
                    return new ResponseEntity<>("address city type is mandatory", HttpStatus.BAD_REQUEST);
                }
                if (updatedOrder.getAddress().getStreet() == null || updatedOrder.getAddress().getStreet().isEmpty()) {
                    return new ResponseEntity<>("address street type is mandatory", HttpStatus.BAD_REQUEST);
                }
                if (updatedOrder.getAddress().getHouseNumber() == null || updatedOrder.getAddress().getHouseNumber().isEmpty()) {
                    return new ResponseEntity<>("house number street type is mandatory", HttpStatus.BAD_REQUEST);
                }
                if (updatedOrder.getPhone() == null || updatedOrder.getPhone().isEmpty() || updatedOrder.getPhone().length() != 10 ) {
                    return new ResponseEntity<>("first name type is mandatory", HttpStatus.BAD_REQUEST);
                }
                Optional<Order> existingOrderOptional = orders.stream()
                        .filter(pizza -> pizza.getOrderId().equals(orderId))
                        .findFirst();
                if (existingOrderOptional.isPresent()) {
                    Order existingOrder = existingOrderOptional.get();

                    existingOrder.setFirstName(updatedOrder.getFirstName());
                    existingOrder.setLastName(updatedOrder.getLastName());
                    existingOrder.setAddress(updatedOrder.getAddress());
                    existingOrder.setPhone(updatedOrder.getPhone());
                    existingOrder.setArrivalTime(updatedOrder.getArrivalTime());
                    existingOrder.setCartItems(updatedOrder.getCartItems());
                    return new ResponseEntity<>(existingOrder, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
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
        orders.removeIf(order -> order.getOrderId().equals(orderId));
    }
}
