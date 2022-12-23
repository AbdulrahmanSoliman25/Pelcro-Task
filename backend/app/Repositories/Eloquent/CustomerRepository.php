<?php

namespace App\Repositories\Eloquent;

use App\Models\Customer;
use App\Repositories\Interfaces\ICustomerRepository;

class CustomerRepository extends BaseRepository implements ICustomerRepository
{
    public function model()
    {
        return Customer::class;
    }
}
