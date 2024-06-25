import React from 'react';

const Contact = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>If you have any questions, feedback, or concerns, please feel free to reach out to us.</p>
                        <p>You can contact us via email, phone, or through the contact form below:</p>
                        <div className="contact-details">
                            <div className="info-item">
                                <h3>Email:</h3>
                                <p>UrPulseIndia@gmail.com</p>
                            </div>
                            <div className="info-item">
                                <h3>Phone:</h3>
                                <p>+123-456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="contact-form">
                        <h3>Send Us a Message</h3>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Your Name" />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Your Email" />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" placeholder="Your Message" rows="4"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
