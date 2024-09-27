package com.sanketh.lms.service;

import com.sanketh.lms.dto.BookDTO;
import com.sanketh.lms.entity.Book;
import com.sanketh.lms.exception.BookNotFoundException;
import com.sanketh.lms.repository.BookRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<?> createBook(Book book) {
        Book savedBook = bookRepository.save(book);

        if (savedBook.getId() != null) {
            BookDTO bookDTO = modelMapper.map(savedBook, BookDTO.class);
            log.info("Book Created: {}", bookDTO);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(bookDTO);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Something went wrong!");
    }

    @Override
    public ResponseEntity<?> getAllBooks() {
        List<Book> bookList = bookRepository.findAll();

        if (!bookList.isEmpty()) {
            List<BookDTO> bookDTOList = bookList.stream()
                    .map(book -> modelMapper.map(book, BookDTO.class))
                    .toList();

            log.info("Books Fetched: {}", bookDTOList);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(bookDTOList);
        }

        log.info("No Books Available");

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body("No Books Available");
    }

    @Override
    public ResponseEntity<?> getBookByName(String bookName) {

        Book book = bookRepository.findByNameIgnoreCase(bookName)
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        if (book.getId() != null) {
            BookDTO bookDTO = modelMapper.map(book, BookDTO.class);

            log.info("Book Found: {}", bookDTO);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(bookDTO);
        }

        log.info("Book Not Found");

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Book not found");

    }

    @Override
    public ResponseEntity<?> updateBook(Book book) {
        Book savedBook = bookRepository.save(book);

        if (savedBook.getId() != null) {
            BookDTO bookDTO = modelMapper.map(savedBook, BookDTO.class);

            log.info("Book Updated");

            return ResponseEntity.status(HttpStatus.OK)
                    .body(bookDTO);
        }

        log.info("failed");

        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body("Book update failed");
    }

    @Override
    public ResponseEntity<?> deleteBook(Integer id) {
        Book deletedBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book does not exists"));

        if (deletedBook != null) {
            bookRepository.deleteById(id);

            log.info("Book with id: {}, deleted successfully", id);

            return ResponseEntity.status(HttpStatus.OK)
                    .body("Book Deleted");
        }

        log.error("Customer with id: {}, does not exists", id);

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Book does not exists");
    }
}
