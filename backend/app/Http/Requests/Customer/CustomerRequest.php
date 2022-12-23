<?php

namespace App\Http\Requests\Customer;

use App\Http\Requests\BaseRequest;

class CustomerRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        if (request()->method() == 'PUT' || request()->method() == 'PATCH') {
            $email =  'required|email:rfc,dns|max:100|unique:customers,email,' . $this->customer->id;
            $username =  'required|string|max:100|unique:customers,username,' . $this->customer->id;
        } else {
            $email = 'required|email:rfc,dns|max:100|unique:customers,email';
            $username = 'required|string|max:100|unique:customers,username';
        }
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => $email,
            'username' => $username,
            'salary' => 'required|numeric|between:0,99999999.99',
            'status' => 'required|numeric|min:0|max:9',
        ];
    }
}
