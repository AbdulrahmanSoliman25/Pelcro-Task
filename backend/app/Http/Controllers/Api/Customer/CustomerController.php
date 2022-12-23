<?php

namespace App\Http\Controllers\Api\Customer;

use App\Helpers\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerRequest;
use App\Http\Resources\Customer\CustomerResource;
use App\Models\Customer;
use App\Repositories\Interfaces\ICustomerRepository;

class CustomerController extends Controller
{

    public function __construct(private ICustomerRepository $customerRepository)
    {
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @auth A.Soliman
     */
    public function index()
    {
        try {
            $customers = CustomerResource::collection(
                $this->customerRepository->all(
                    ['id', 'first_name', 'last_name', 'email', 'username', 'salary', 'status']
                )
            );
            return $customers->additional(JsonResponse::success());
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * @auth A.Soliman
     */
    public function store(CustomerRequest $request)
    {
        try {
            $model = $this->customerRepository->create($request->validated());
            $customer = new CustomerResource($model);
            return $customer->additional(JsonResponse::savedSuccessfully());
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param   Customer $customer
     * @return \Illuminate\Http\Response
     * @auth A.Soliman
     */
    public function show(Customer $customer)
    {
        try {
            $customer = new CustomerResource($customer);
            return $customer->additional(JsonResponse::success());
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param   Customer $customer
     * @return \Illuminate\Http\Response
     * @auth A.Soliman
     */
    public function update(CustomerRequest $request, Customer $customer)
    {
        try {
            $this->customerRepository->update($request->validated(), $customer['id']);
            return JsonResponse::respondSuccess(trans(JsonResponse::MSG_UPDATED_SUCCESSFULLY), null);
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Customer $customer
     * @return \Illuminate\Http\Response
     * @auth A.Soliman
     */
    public function destroy(Customer $customer)
    {
        try {
            $this->customerRepository->delete($customer['id']);
            return JsonResponse::respondSuccess(trans(JsonResponse::MSG_DELETED_SUCCESSFULLY));
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }
}
