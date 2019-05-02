package org.thibaut.library.service.impl;

import org.thibaut.library.service.CoordinatesService;
import org.thibaut.library.domain.Coordinates;
import org.thibaut.library.repository.CoordinatesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Coordinates.
 */
@Service
@Transactional
public class CoordinatesServiceImpl implements CoordinatesService {

    private final Logger log = LoggerFactory.getLogger(CoordinatesServiceImpl.class);

    private final CoordinatesRepository coordinatesRepository;

    public CoordinatesServiceImpl(CoordinatesRepository coordinatesRepository) {
        this.coordinatesRepository = coordinatesRepository;
    }

    /**
     * Save a coordinates.
     *
     * @param coordinates the entity to save
     * @return the persisted entity
     */
    @Override
    public Coordinates save(Coordinates coordinates) {
        log.debug("Request to save Coordinates : {}", coordinates);
        return coordinatesRepository.save(coordinates);
    }

    /**
     * Get all the coordinates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Coordinates> findAll() {
        log.debug("Request to get all Coordinates");
        return coordinatesRepository.findAll();
    }


    /**
     * Get one coordinates by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Coordinates> findOne(Long id) {
        log.debug("Request to get Coordinates : {}", id);
        return coordinatesRepository.findById(id);
    }

    /**
     * Delete the coordinates by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Coordinates : {}", id);
        coordinatesRepository.deleteById(id);
    }
}
