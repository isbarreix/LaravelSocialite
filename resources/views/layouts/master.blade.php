<!DOCTYPE html>
<html lang="en">
    <head>
        
    @include('layouts.head')
    </head>
    
    
    <body>
    
    @include ('layouts.navbar')
        
    @yield ('bodyContent')
    
    @include ('layouts.footer')
        
        
    
    </body>
    
    @include('layouts.js')

    @yield('jsPropios')
    
</html>