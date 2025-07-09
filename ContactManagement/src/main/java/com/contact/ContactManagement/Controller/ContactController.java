package com.contact.ContactManagement.Controller;

import com.contact.ContactManagement.Dto.ContactDto;
import com.contact.ContactManagement.Service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin("*") // Enable frontend access if hosted separately
public class ContactController {

    @Autowired
    private ContactService contactService;

    // CREATE
    @PostMapping
    public ResponseEntity<ContactDto> createContact(@Valid @RequestBody ContactDto contactDto) {
        return ResponseEntity.ok(contactService.createContact(contactDto));
    }

    // READ by ID
    @GetMapping("/{id}")
    public ResponseEntity<ContactDto> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<ContactDto>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ContactDto> updateContact(@PathVariable Long id, @Valid @RequestBody ContactDto contactDto) {
        return ResponseEntity.ok(contactService.updateContact(id, contactDto));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok("Contact deleted successfully");
    }
}
