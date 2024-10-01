package com.sanketh.lms.controller;

import com.sanketh.lms.entity.Book;
import com.sanketh.lms.service.BookService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@Tag(name = "Books")
@AllArgsConstructor
@CrossOrigin("*")
public class BookController {

    private final BookService bookService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@RequestBody Book book) {
        return bookService.createBook(book);
    }

    @GetMapping("/get")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> get() {
        return bookService.getAllBooks();
    }

    @GetMapping("/getById/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        return bookService.fetchById(id);
    }

    @GetMapping("search?name=${name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getBookByName(@PathVariable String bookName) {
        return bookService.getBookByName(bookName);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@RequestBody Book book) {
        return bookService.updateBook(book);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        return bookService.deleteBook(id);
    }

}

