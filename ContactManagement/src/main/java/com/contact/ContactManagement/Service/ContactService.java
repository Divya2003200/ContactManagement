package com.contact.ContactManagement.Service;

import com.contact.ContactManagement.Dto.ContactDto;
import com.contact.ContactManagement.Entity.Contact;
import com.contact.ContactManagement.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Convert Entity -> DTO
    private ContactDto mapToDto(Contact contact) {
        return new ContactDto(
                contact.getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getAddress(),
                contact.getEmail(),
                contact.getContactNo()
        );
    }

    // Convert DTO -> Entity
    private Contact mapToEntity(ContactDto dto) {
        Contact contact = new Contact();
        contact.setId(dto.getId());
        contact.setFirstName(dto.getFirstName());
        contact.setLastName(dto.getLastName());
        contact.setAddress(dto.getAddress());
        contact.setEmail(dto.getEmail());
        contact.setContactNo(dto.getContactNo());
        return contact;
    }

    public ContactDto createContact(ContactDto contactDto) {
        Optional<Contact> existing = contactRepository.findByEmail(contactDto.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Contact with this email already exists.");
        }
        Contact contact = mapToEntity(contactDto);
        return mapToDto(contactRepository.save(contact));
    }

    public ContactDto updateContact(Long id, ContactDto contactDto) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        contact.setFirstName(contactDto.getFirstName());
        contact.setLastName(contactDto.getLastName());
        contact.setAddress(contactDto.getAddress());
        contact.setEmail(contactDto.getEmail());
        contact.setContactNo(contactDto.getContactNo());

        return mapToDto(contactRepository.save(contact));
    }

    public ContactDto getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        return mapToDto(contact);
    }

    public List<ContactDto> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }
}
