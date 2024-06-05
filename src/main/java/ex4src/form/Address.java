package ex4src.form;

public class Address {
    private String street;
    private String houseNumber;
    private String city;

    // Constructor
    public Address(String street, String houseNumber, String city) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
    }

    // Getters and Setters
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Optional: Override toString() method for debugging purposes
    @Override
    public String toString() {
        return "Address{" +
                "street='" + street + '\'' +
                ", houseNumber='" + houseNumber + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
