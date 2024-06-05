package ex4src.form;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final List<Order> orders = new ArrayList<>();

    @PostMapping
    public Order saveOrder(@RequestBody Order order) {
        orders.add(order);
        return order;
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        // Assuming 'orders' is a list of all orders, you can iterate over it to find the order with the given id
        for (Order order : orders) {
            if (order.getOrderId() == orderId) {
                return order;
            }
        }
        return null; // If no order with the given id is found
    }
}
