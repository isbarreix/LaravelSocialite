<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/about', function() {

    return view('about');
});

//  Controller => PostsController

//  Eloquent model => Post

// migration => create posts_table

Route::get('/pruebaPlantilla', 'PostsController@index')->name('index');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');



Route::get('auth/facebook', 'FacebookController@redirectToProvider')->name('fblogin');
Route::get('auth/facebook/callback', 'FacebookController@handleProviderCallback');

