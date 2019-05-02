package org.thibaut.library.service;

import org.thibaut.library.domain.Library;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Library.
 */
public interface LibraryService {

    /**
     * Save a library.
     *
     * @param library the entity to save
     * @return the persisted entity
     */
    Library save(Library library);

    /**
     * Get all the libraries.
     *
     * @return the list of entities
     */
    List<Library> findAll();
    /**
     * Get all the LibraryDTO where Coordinates is null.
     *
     * @return the list of entities
     */
    List<Library> findAllWhereCoordinatesIsNull();


    /**
     * Get the "id" library.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Library> findOne(Long id);

    /**
     * Delete the "id" library.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
