import React from 'react'; // Import React
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS for styling

function ContactAs() {
    return (
        <div className="container mt-5">
            <h2>Contact Us</h2>
            <p>If you have any questions or need further information, feel free to reach out to us:</p>
            <p>Email: <a href="mailto:meirge@edu.hac.ac.il">meirge@edu.hac.ac.il</a></p>
            <p>Phone: <a href="tel:+972556622349">055-662-2349</a></p>
        </div>
    );
}

export default ContactAs;
