<?php

namespace App\Observers;

use App\Models\Customer;
use App\Notifications\Notifications;

class CustomerObserver
{
    /**
     * Handle the Customer "created" event.
     *
     * @param  \App\Models\Customer  $customer
     * @return void
     */
    public function created(Customer $customer)
    {
        Notifications::through(['email'])->toMail($customer->email)->send(
            'Welcome to our platform , you have successfully registered',
            'Customer Registration'
        );
    }
}
