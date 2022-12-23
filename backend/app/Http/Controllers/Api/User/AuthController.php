<?php

namespace App\Http\Controllers\Api\User;

use App\Helpers\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Resources\User\UserResource;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function __construct(private IUserRepository $userRepository)
    {
    }

    public function authenticateUser($user)
    {
        config(['auth.guards.api.provider' => 'user']);
        $user['token'] = $user->createToken('Pelcro Client', ['user'])->plainTextToken;
        return $user;
    }

    /**
     *user login
     *
     * @param Request $request
     *
     * @return Resource
     * @auth A.Soliman
     */
    public function login(LoginRequest $request)
    {
        try {
            $user =  $this->userRepository->findBy('email', $request['email'], ['id', 'name', 'email', 'password']);
            return Hash::check($request['password'], $user['password']) ?
                JsonResponse::respondSuccess(trans(JsonResponse::MSG_Login_Success), new UserResource($this->authenticateUser($user)))
                : JsonResponse::respondError(trans(JsonResponse::MSG_MIS_PASS));
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }


    /**
     *user logout
     *     *
     * @return Resource
     * @auth A.Soliman
     */
    public function logout()
    {
        try {
            user()->tokens()->delete();
            return JsonResponse::respondSuccess(trans(JsonResponse::MSG_Logout_Success));
        } catch (\Exception $e) {
            return JsonResponse::respondError($e->getMessage());
        }
    }
}
