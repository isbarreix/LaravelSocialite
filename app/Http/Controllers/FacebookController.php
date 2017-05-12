<?php

namespace App\Http\Controllers;

use Socialite;

class FacebookController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('facebook')->user();
        dd($user);
        //$authUser = $this->findOrCreateUser($user);

        //Auth::login($user, true);
        
        return redirect()->to('/about');
    }
    
    
       /**
     * Return user if exists; create and return if doesn't
     *
     * @param $fbUser
     * @return User
    
    private function findOrCreateUser($fbUser)
    {

        if ($authUser = User::where('facebook_id', $fbUser->id)->first()) {
            return $authUser;
        }

        return User::create([
            'name' => $fbUser->name,
            'email' => $fbUser->email,
            'facebook_id' => $fbUser->id,
            'avatar' => $fbUser->avatar
        ]);

    } */
}