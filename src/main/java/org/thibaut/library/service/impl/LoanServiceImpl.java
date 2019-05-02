package org.thibaut.library.service.impl;

import org.thibaut.library.service.LoanService;
import org.thibaut.library.domain.Loan;
import org.thibaut.library.repository.LoanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Loan.
 */
@Service
@Transactional
public class LoanServiceImpl implements LoanService {

    private final Logger log = LoggerFactory.getLogger(LoanServiceImpl.class);

    private final LoanRepository loanRepository;

    public LoanServiceImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    /**
     * Save a loan.
     *
     * @param loan the entity to save
     * @return the persisted entity
     */
    @Override
    public Loan save(Loan loan) {
        log.debug("Request to save Loan : {}", loan);
        return loanRepository.save(loan);
    }

    /**
     * Get all the loans.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Loan> findAll() {
        log.debug("Request to get all Loans");
        return loanRepository.findAll();
    }


    /**
     * Get one loan by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Loan> findOne(Long id) {
        log.debug("Request to get Loan : {}", id);
        return loanRepository.findById(id);
    }

    /**
     * Delete the loan by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Loan : {}", id);
        loanRepository.deleteById(id);
    }
}
