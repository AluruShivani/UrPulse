package com.example.entity;

import java.util.List;

public class PrescriptionTransferRequest {
    private List<String> prescriptions;
    private long appointmentId;

    // Getters and Setters

    public List<String> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<String> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(long appointmentId) {
        this.appointmentId = appointmentId;
    }
}
