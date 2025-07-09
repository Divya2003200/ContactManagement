
import { useEffect, useState } from "react";
import {
  DataGrid, GridActionsCellItem
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  getAllContacts,
  deleteContact,
  updateContact,
  createContact
} from "../api/ContactService";
import ContactForm from "./ContactForm";

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchContacts = async () => {
    try {
      const res = await getAllContacts();
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  };

  const handleEdit = (params) => {
    setFormData(params.row);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    fetchContacts();
  };

  const handleSubmit = async () => {
    if (formData.id) {
      await updateContact(formData.id, formData);
    } else {
      await createContact(formData);
    }
    setFormOpen(false);
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    minWidth: 120
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    minWidth: 120
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    minWidth: 200
  },
  {
    field: "contactNo",
    headerName: "Phone",
    flex: 1,
    minWidth: 130
  },
  {
    field: "address",
    headerName: "Address",
    flex: 2,
    minWidth: 200
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    getActions: (params) => [
      <GridActionsCellItem icon={<Edit />} label="Edit" onClick={() => handleEdit(params)} />,
      <GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => handleDelete(params.id)} />
    ]
  }
];

  return (
    <Box sx={{ height: 600, p: 2 }}>
      <Button variant="contained" onClick={() => {
        setFormData({});
        setFormOpen(true);
      }}>
        Add Contact
      </Button>
      <DataGrid
        rows={contacts}
        columns={columns}
        getRowId={(row) => row.id}
        sx={{ mt: 2 }}
      />
      <ContactForm
        open={formOpen}
        handleClose={() => setFormOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}
