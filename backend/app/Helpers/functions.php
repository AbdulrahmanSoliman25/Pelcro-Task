<?php

use App\Models\User;

if (!function_exists('user')) {

    /**
     * get authenticated user
     *
     * @return User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    function user()
    {
        return auth('api')->check() ? auth()->user() : new User();
    }
}
