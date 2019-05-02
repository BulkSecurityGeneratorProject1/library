package org.thibaut.library.service.impl;

import org.thibaut.library.service.EditorService;
import org.thibaut.library.domain.Editor;
import org.thibaut.library.repository.EditorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Editor.
 */
@Service
@Transactional
public class EditorServiceImpl implements EditorService {

    private final Logger log = LoggerFactory.getLogger(EditorServiceImpl.class);

    private final EditorRepository editorRepository;

    public EditorServiceImpl(EditorRepository editorRepository) {
        this.editorRepository = editorRepository;
    }

    /**
     * Save a editor.
     *
     * @param editor the entity to save
     * @return the persisted entity
     */
    @Override
    public Editor save(Editor editor) {
        log.debug("Request to save Editor : {}", editor);
        return editorRepository.save(editor);
    }

    /**
     * Get all the editors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Editor> findAll() {
        log.debug("Request to get all Editors");
        return editorRepository.findAll();
    }



    /**
     *  get all the editors where Coordinates is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Editor> findAllWhereCoordinatesIsNull() {
        log.debug("Request to get all editors where Coordinates is null");
        return StreamSupport
            .stream(editorRepository.findAll().spliterator(), false)
            .filter(editor -> editor.getCoordinates() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one editor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Editor> findOne(Long id) {
        log.debug("Request to get Editor : {}", id);
        return editorRepository.findById(id);
    }

    /**
     * Delete the editor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Editor : {}", id);
        editorRepository.deleteById(id);
    }
}
