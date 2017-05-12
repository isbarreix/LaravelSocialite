      <nav class="navbar navbar-default navbar-static-top" id="navbar">
          <div class="container-fluid">

            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <a class="navbar-brand" href="#"><img class="img-responsive" src="images/Caniexlogo.png" id="logo" alt="logotipo Caniex"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              <ul class="navbar-brand">
                   <button class="btn btn-outline-success my-2 my-sm-0" id="btnRandom" onclick="mostrarPrecargadoRandom()">Cargar Random </button>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <button class="btn btn-outline-success my-2 my-sm-0" id="tema">Cambiar Tema</button>
              </ul>
              @if (Route::has('login'))
                <div class="top-right links">
                    @if (Auth::check())
                        <a href="{{ url('/home') }}">Home</a>
                    @endif
                </div>
              @endif
                
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
      </nav>