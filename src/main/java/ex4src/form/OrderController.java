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
        for (Order order : orders) {
            if (order.getOrderId() == orderId) {
                return order;
            }
        }
        return null;
    }

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

    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable int orderId) {
        orders.removeIf(order -> order.getOrderId() == orderId);
    }
}
