package ex4src.form;
/**
 * The {@code Address} class represents a street address.
 * It includes information about the street, house number, and city.
 * This class provides getter and setter methods for each field, and
 * overrides the {@code toString} method for debugging purposes.
 */
public class Address {
    private String street;
    private String houseNumber;
    private String city;
    /**
     * Constructs an {@code Address} with the specified street, house number, and city.
     *
     * @param street the street name
     * @param houseNumber the house number
     * @param city the city name
     */
    // Constructor
    public Address(String street, String houseNumber, String city) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
    }
    /**
     * Returns the street name.
     *
     * @return the street name
     */
    // Getters and Setters
    public String getStreet() {
        return street;
    }
    /**
     * Sets the street name.
     *
     * @param street the new street name
     */
    public void setStreet(String street) {
        this.street = street;
    }
    /**
     * Returns the house number.
     *
     * @return the house number
     */
    public String getHouseNumber() {
        return houseNumber;
    }
    /**
     * Sets the house number.
     *
     * @param houseNumber the new house number
     */
    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
    /**
     * Returns the city name.
     *
     * @return the city name
     */
    public String getCity() {
        return city;
    }
    /**
     * Sets the city name.
     *
     * @param city the new city name
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Returns a string representation of the {@code Address}.
     *
     * @return a string representation of the {@code Address}
     */
    @Override
    public String toString() {
        return "Address{" +
                "street='" + street + '\'' +
                ", houseNumber='" + houseNumber + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
