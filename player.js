function primal(){query=location.search.slice(1),partes=query.split("&"),partes.forEach(function(e){valores=e.split("="),valores[0]&&(video.src=valores[0])})}function playgf(){video.paused?(g_play.style.WebkitTransform="scale(1,1)",g_play.style.msTransform="scale(1,1)",g_play.style.transform="scale(1,1)"):(g_play.style.WebkitTransform="scale(0,0)",g_play.style.msTransform="scale(0,0)",g_play.style.transform="scale(0,0)")}function playPause(){video.paused?video.play():(video.pause(),video.paused&&(play.querySelector("span").className="ion-play",playgf()))}function resetVel(){video.playbackRate=1,velControle.value=25,velslide.style.width="25%",velslide.style.backgroundColor="#1e90ff"}function SomMudo(){0==video.volume?(0==volControle.value?(video.volume=1,volControle.value=100,volslide.style.width="100%",volslide.style.backgroundColor="#fff"):(video.volume=volControle.value/100,volslide.style.width=volControle.value+"%"),mudo.querySelector("span").className="ion-android-volume-up"):(video.volume=0,mudo.querySelector("span").className="ion-android-volume-off",volslide.style.width="0%")}function TempoDuracao(){var e=video.currentTime*(100/video.duration);atual.style.width=e+"%",e<33.3?(atual.style.backgroundColor="#1e90ff",loader.querySelector("div").style.borderColor="#1e90ff"):e<66.6?(atual.style.backgroundColor="#1e90ff",loader.querySelector("div").style.borderColor="#1e90ff"):(atual.style.backgroundColor="rgb(229, 69, 53)",loader.querySelector("div").style.borderColor="rgb(229, 69, 53)"),hour=Math.floor(video.duration/3600),min=Math.floor(video.duration/60),seg=Math.floor(video.duration/60%1*60),currentHour=Math.floor(video.currentTime/3600),currentMin=Math.floor(video.currentTime/60),currentSeg=Math.floor(video.currentTime/60%1*60),tempoatual.innerHTML=convertTimer(currentHour,currentMin,currentSeg),tempototal.innerHTML=convertTimer(hour,min,seg),buffer()}function convertTimer(e,l,o){return e=e<10&&0<e?"0"+String(e)+":":"",l<10?l="0"+String(l):59<l&&("0"==(l-=60*Math.floor(l/60))&&(l="00"),0<l&&l<10&&(l="0"+l)),o<10&&(o="0"+String(o)),String(e)+String(l)+":"+String(o)}function buffer(){var e=video.duration;if(0<e)for(var l=0;l<video.buffered.length;l++)if(video.buffered.start(video.buffered.length-1-l)<video.currentTime){carregado.style.width=video.buffered.end(video.buffered.length-1-l)/e*100+"%";break}}function TelaCheia(){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement?(document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen(),fullscreen.querySelector("span").className="ion-android-expand",player.classList.add("np")):(player.requestFullscreen?player.requestFullscreen():player.msRequestFullscreen?player.msRequestFullscreen():player.mozRequestFullScreen?player.mozRequestFullScreen():player.webkitRequestFullscreen&&player.webkitRequestFullscreen(),fullscreen.querySelector("span").className="ion-android-contract",player.classList.remove("np"))}function exitFull(){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||(fullscreen.querySelector("span").className="ion-android-expand")}function carregandoVideo(e){"waiting"==e.type?loader.style.display="block":(loader.style.display="none",play.querySelector("span").className="ion-pause",playgf())}function resetPlayer(){video.currentTime=0,TempoDuracao(),tempoatual.innerHTML="00:00",tempototal.innerHTML="00:00",play.querySelector("span").className="ion-android-refresh",playgf(),loader.style.display="none"}function resetPlayer2(){video.currentTime=0,TempoDuracao(),tempoatual.innerHTML="00:00",tempototal.innerHTML="00:00",play.querySelector("span").className="ion-pause",playgf(),loader.style.display="none"}var tempoContado;function controle(e){function l(){player.style.cursor="none",enbaixo.style.bottom="-55px"}player.style.cursor="auto",enbaixo.style.bottom="0px",clearTimeout(tempoContado),tempoContado=setTimeout(l,3e3)}function slide_config(){"0px"==pageconfig.style.right?pageconfig.style.right="-250px":pageconfig.style.right="0px"}window.onload=function(){player=document.getElementById("player"),video=player.querySelector(".media"),enbaixo=player.querySelector(".enbaixo"),atual=player.querySelector(".barra-atual"),carregado=player.querySelector(".barra-carregado"),play=player.querySelector(".play"),mudo=player.querySelector(".mudo"),tempoatual=player.querySelector(".tempo-atual"),tempototal=player.querySelector(".tempo-total"),volslide=player.querySelector(".vol-slide"),volControle=player.querySelector(".vol-controle"),bt_config=player.querySelector(".configuracao"),g_play=player.querySelector(".playG"),loader=player.querySelector(".loader"),velslide=player.querySelector(".vel-slide"),velControle=player.querySelector(".vel-controle"),velreset=player.querySelector(".resetVel"),bt_c_config=player.querySelector(".configclose"),pageconfig=player.querySelector(".config"),play.addEventListener("click",playPause,!1),g_play.addEventListener("click",playPause,!1),velreset.addEventListener("click",resetVel,!1),mudo.addEventListener("click",SomMudo,!1),bt_config.addEventListener("click",slide_config,!1),bt_c_config.addEventListener("click",slide_config,!1),fullscreen=player.querySelector(".tela-cheia"),fullscreen.addEventListener("click",TelaCheia,!1),player.addEventListener("mousemove",controle,!1),player.addEventListener("mousedown",controle,!1),player.addEventListener("keydown",controle,!1),primal(),video.addEventListener("timeupdate",TempoDuracao,!1),video.addEventListener("waiting",carregandoVideo),video.addEventListener("playing",carregandoVideo),document.addEventListener("webkitfullscreenchange",exitFull),document.addEventListener("mozfullscreenchange",exitFull),document.addEventListener("fullscreenchange",exitFull)},window.SetVolume=function(e){video.volume=e/100,volslide.style.width=e+"%","0%"==volslide.style.width?mudo.querySelector("span").className="ion-android-volume-off":mudo.querySelector("span").className="ion-android-volume-up",volslide.style.backgroundColor=e<33.3?"#1e90ff":"#fff"},window.SetVelocidade=function(e){video.playbackRate=e/25,velslide.style.width=e+"%",velslide.style.backgroundColor=e<33.3?"#1e90ff":e<66.6?"#1e90ff":"#fff"},window.SetTemp=function(e){video.currentTime=video.duration*(e/100),TempoDuracao(),buffer(),video.paused?play.querySelector("span").className="ion-play":play.querySelector("span").className="ion-pause"},window.SetAspecto=function(e){video.style.objectFit=e};