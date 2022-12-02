package projectbackend.service.customer.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectbackend.model.customer.CustomerType;
import projectbackend.repository.customer.ICustomerTypeRepository;
import projectbackend.service.customer.ICustomerTypeService;

import java.util.List;

@Service
public class CustomerTypeService implements ICustomerTypeService {

    @Autowired
    private ICustomerTypeRepository icustomerTypeRepository;

    @Override
    public List<CustomerType> findAllCustomerType() {
        return icustomerTypeRepository.findAll();
    }
}