package org.thibaut.library.service.impl;

import org.thibaut.library.service.LibraryService;
import org.thibaut.library.domain.Library;
import org.thibaut.library.repository.LibraryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Library.
 */
@Service
@Transactional
public class LibraryServiceImpl implements LibraryService {

    private final Logger log = LoggerFactory.getLogger(LibraryServiceImpl.class);

    private final LibraryRepository libraryRepository;

    public LibraryServiceImpl(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    /**
     * Save a library.
     *
     * @param library the entity to save
     * @return the persisted entity
     */
    @Override
    public Library save(Library library) {
        log.debug("Request to save Library : {}", library);
        return libraryRepository.save(library);
    }

    /**
     * Get all the libraries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Library> findAll() {
        log.debug("Request to get all Libraries");
        return libraryRepository.findAll();
    }



    /**
     *  get all the libraries where Coordinates is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Library> findAllWhereCoordinatesIsNull() {
        log.debug("Request to get all libraries where Coordinates is null");
        return StreamSupport
            .stream(libraryRepository.findAll().spliterator(), false)
            .filter(library -> library.getCoordinates() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one library by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Library> findOne(Long id) {
        log.debug("Request to get Library : {}", id);
        return libraryRepository.findById(id);
    }

    /**
     * Delete the library by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Library : {}", id);
        libraryRepository.deleteById(id);
    }
}
