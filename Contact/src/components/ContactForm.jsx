
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ContactForm({ open, handleClose, formData, setFormData, handleSubmit }) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) setErrors({});
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address?.trim()) newErrors.address = "Address is required";

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.contactNo?.trim()) {
      newErrors.contactNo = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) handleSubmit();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{formData.id ? "Edit" : "Add"} Contact</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone"
            name="contactNo"
            value={formData.contactNo || ""}
            onChange={handleChange}
            error={!!errors.contactNo}
            helperText={errors.contactNo}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
