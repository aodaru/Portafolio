<?php

namespace App\Http\Middleware;

use App\Helpers\JwtAuth;
use Closure;
use Illuminate\Http\Request;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Comprobar si el usuario esta identificado
        $token = $request->header('Authorization');
        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);

        if ($checkToken) {
            return $next($request);
        } else {
            $data = [
                'status' => 'Error',
                'code' => 400,
                'message' => 'Usuario no esta autentificado',
            ];

            return response()->json($data, $data['code']);
        }

    }
}
