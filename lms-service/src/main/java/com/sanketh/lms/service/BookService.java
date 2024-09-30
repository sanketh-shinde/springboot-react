package com.sanketh.lms.service;

import com.sanketh.lms.entity.Book;
import org.springframework.http.ResponseEntity;

public interface BookService {


    ResponseEntity<?> createBook(Book book);

    ResponseEntity<?> getAllBooks();

    ResponseEntity<?> getBookByName(String bookName);

    ResponseEntity<?> fetchById(Integer id);

    ResponseEntity<?> updateBook(Book book);

    ResponseEntity<?> deleteBook(Integer id);

}
