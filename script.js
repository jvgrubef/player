function startplayer(playlistArray, add){
    //variaveis
    var activeSource = 0;
    var volume       = 1;
    var velocity     = 1;
    var player, playerElement, controllerTime, sources;
    //box
    player         = document.getElementById("player");
    media          = player.querySelector(".media");
    titleplayer    = player.querySelector(".titleplayer");
    listsource     = player.querySelector(".playlist ul");
    loader         = player.querySelector('.loading');
    controls       = player.querySelectorAll('.controls');
    menu           = player.querySelectorAll('.menu');
    //text
    timer          = player.querySelectorAll('.timer p');
    sublites       = player.querySelector('.sublites');
    //inputs
    inputtime      = player.querySelector(".bar.time input");
    inputvel       = player.querySelector(".bar.velocity input");
    inputvol       = player.querySelector(".bar.volume input");
    inputautonext  = player.querySelector(".checkbox.autonext input");
    inputscanlines = player.querySelector(".checkbox.scanlines input");
    inputaspect    = player.querySelectorAll(".radio.aspect input");
    inputloop      = player.querySelectorAll(".radio.loop input");
    inputsettings  = player.querySelector(".inputcss.settings");
    inputplaylist  = player.querySelector(".inputcss.playlist");
    inputexpand    = player.querySelector(".inputcss.expand");
    //slide
    slidetime      = player.querySelector(".bar.time .slide");
    slidebuffer    = player.querySelector(".bar.time .buffer");
    slidevel       = player.querySelector(".bar.velocity .slide");
    slidevol       = player.querySelector(".bar.volume .slide");
    //pointer
    pointertime    = player.querySelector(".bar.time .pointer");
    pointervel     = player.querySelector(".bar.velocity .pointer");
    pointervol     = player.querySelector(".bar.volume .pointer");
    //buttons
    previous       = player.querySelector(".previous");
    playpause      = player.querySelector(".playpause");
    next           = player.querySelector(".next");
    restorevel     = player.querySelector(".restorevel");
    togglesound    = player.querySelector(".togglesound");
    fullscreen     = player.querySelector(".fullscreen");
    preferences    = player.querySelector(".preferences");
    showplaylist   = player.querySelector(".showplaylist");
    hidepref       = player.querySelector(".menu.settings .buttons .close");
    hideplaylist   = player.querySelector(".menu.playlist .buttons .close");
    expandplaylist = player.querySelector(".menu.playlist .buttons .expand");
    //eventos
    player.addEventListener("mousemove", controle, false);
	  player.addEventListener("mousedown", controle, false);
    player.addEventListener("keydown", controle, false);

    for (var index = 0; index < inputaspect.length; index++){
        inputaspect[index].onchange = function(){
            media.setAttribute("class", "media " + this.value);
        }
    }

    function DOMPlayer(e){
        //funcoes
        function convertTimer(horas, minutos, segundos){
            horas = ((horas<10 && horas>0) ? (horas = '0' + String(horas) + ":") : '');
            if(minutos<10){
                minutos = '0' + String(minutos);
            }else if(minutos > 59){
                minutos = minutos - (Math.floor(minutos / 60) * 60);
                if(minutos == '0'){
                    minutos = '00';
                }
                if(minutos > 0 &&  minutos < 10){
                    minutos = '0' + minutos
                }
            }
            if(segundos<10){
                segundos = '0' + String(segundos);
            }
            return String(horas) + String(minutos) + ':' + String(segundos);
        }
        function start(e, restore){
            if(restore){
                //Volume
                playerElement.volume  = volume;
                slidevol.style.width  = (volume * 100) + "%";
                pointervol.style.left = "calc(" + (volume * 100) + "% - 4px)";
                if(volume == 0){
                    togglesound.querySelector("span").className = "ion-android-volume-mute";
                }else if(volume > 0 && 0.66 <= volume){
                    togglesound.querySelector("span").className = "ion-android-volume-up";
                }else if(0.66 >= volume){
                    togglesound.querySelector("span").className = "ion-android-volume-down";
                }
                //Velocidade
                playerElement.playbackRate = velocity
                slidevel.style.width       = ((velocity * 100) / 4) + "%";
                pointervel.style.left      = "calc(" + ((velocity * 100) / 4) + "% - 4px)";
            }else{
                playpause.querySelector("span").className = "ion-refresh";
            }
            //tempo
            slidebuffer.style.width = '0%';
            slidetime.style.width   = '0%';
            pointertime.style.left  = "calc(0% - 4px)";
            timer[0].innerHTML      = '00:00';            
            //play
            if(e) playerElement.play();
        }
        function timeupdate(){
            pcg = playerElement.currentTime / playerElement.duration * 100;
            inputtime.value = pcg;
            slidetime.style.width = pcg + '%';
            pointertime.style.left = "calc(" + pcg + "% - 4px)";
            currentHour = Math.floor(playerElement.currentTime / 3600);
            currentMin  = Math.floor(playerElement.currentTime / 60);
            currentSeg  = Math.floor(((playerElement.currentTime / 60) % 1) * 60);
            hour        = Math.floor(playerElement.duration / 3600);
            min         = Math.floor(playerElement.duration / 60);
            seg         = Math.floor(((playerElement.duration / 60) % 1) * 60);
            timer[0].innerHTML = convertTimer(currentHour, currentMin, currentSeg);
            timer[2].innerHTML = convertTimer(hour, min, seg);
        }
        //entradas
        inputtime.oninput = function(){
            playerElement.currentTime = playerElement.duration * (this.value / 100);            
        }
        inputvel.oninput = function(){
            velocity = this.value / 25;
            playerElement.playbackRate = this.value / 25;
            slidevel.style.width  = this.value + "%";
            pointervel.style.left = "calc(" + this.value + "% - 4px)";
        }
        inputvol.oninput = function(){
            volume = this.value / 100;
            playerElement.volume  = this.value / 100;
            slidevol.style.width  = this.value + "%";
            pointervol.style.left = "calc(" + this.value + "% - 4px)";
            if(this.value == 0){
                togglesound.querySelector("span").className = "ion-android-volume-mute";
            }else if(this.value > 0 && 66.6 <= this.value ){
                togglesound.querySelector("span").className = "ion-android-volume-up";
            }else if(66.6 >= this.value){
                togglesound.querySelector("span").className = "ion-android-volume-down";
            }
        }        
        //eventos
        playerElement.addEventListener("timeupdate", timeupdate);
        playerElement.onplay = function(){
            playpause.querySelector("span").className = "ion-pause";
        }
        playerElement.onpause = function(){
            playpause.querySelector("span").className = "ion-play";
        }
        playerElement.onprogress = function(){
            for (var z = 0; z < this.buffered.length; z++) {
                if (this.buffered.start(this.buffered.length - 1 - z) < this.currentTime) {
                    slidebuffer.style.width = (this.buffered.end(this.buffered.length - 1 - z) / this.duration) * 100 + "%";
                    break;
                }
            }
        }
        playerElement.onwaiting = function(){
            loader.style.display  = "initial";
        }
        playerElement.onplaying = function(){
            loader.style.display  = "none";
        }
        playerElement.onended = function(){
            start(false, false);
            playlist(inputautonext.checked);
        }
        //cliques
        playpause.onclick = function(){
            if(playerElement.paused){
                playerElement.play();
            }else{
                playerElement.pause();
            }	
        }
        restorevel.onclick = function(){
            velocity = 1;
            playerElement.playbackRate = 1;
            inputvel.value = 25;
            slidevel.style.width       = "25%";
            pointervel.style.left      = "calc(25% - 4px)";
        }
        togglesound.onclick = function(){
            if(playerElement.volume == 0){
                if(inputvol.value == 0){
                    volume = 1;
                    playerElement.volume = 1;
                    inputvol.value = 100;
				    slidevol.style.width =  "100%";
				    pointervol.style.left = "calc(100% - 4px)";
                    this.querySelector("span").className = "ion-android-volume-up";
                }else{
                    volume = inputvol.value / 100;
                    playerElement.volume = inputvol.value / 100;
                    slidevol.style.width = inputvol.value + "%";
                    pointervol.style.left = "calc(" + inputvol.value + "% - 4px)";
                    if(inputvol.value > 0 && 66.6 <= inputvol.value ){
                        this.querySelector("span").className = "ion-android-volume-up";
                    }else if(66.6 >= inputvol.value){
                        this.querySelector("span").className = "ion-android-volume-down";
                    }
                }
            }else{
                volume = 0;
                playerElement.volume = 0;
			    slidevol.style.width = "0%";
			    pointervol.style.left = "calc(0% - 4px)";
			    this.querySelector("span").className = "ion-android-volume-mute";
            }
        }
        start(e, true);
    }
    fullscreen.onclick = function(){
        if(
            !document.fullscreenElement 
            && !document.mozFullScreenElement 
            && !document.webkitFullscreenElement 
            && !document.msFullscreenElement
        ){
			if(player.requestFullscreen){
				player.requestFullscreen();
			}else if (player.msRequestFullscreen){
				player.msRequestFullscreen();
			}else if (player.mozRequestFullScreen){
				player.mozRequestFullScreen();
			}else if (player.webkitRequestFullscreen){
				player.webkitRequestFullscreen();
            }
            this.querySelector('span').className = "ion-android-contract";
		}else{
			if(document.exitFullscreen){
				document.exitFullscreen();
			}else if(document.msExitFullscreen){
				document.msExitFullscreen();
			}else if(document.mozCancelFullScreen){
				document.mozCancelFullScreen();
			}else if(document.webkitExitFullscreen){
				document.webkitExitFullscreen();
            }
            this.querySelector('span').className = "ion-android-expand";
		}
    }
    function controle(){
		if(player.classList.contains('video')){
			On();
			function On() {
                controls[0].style.top = '0px';
                controls[1].style.bottom = '0px';
                sublites.style.bottom = '65px';
				clearTimeout(controllerTime);
				controllerTime = setTimeout(Off, 3000);
			}
			function Off() {                
                controls[0].style.top = '-55px';
                controls[1].style.bottom = '-55px';
                sublites.style.bottom = '15px';
            }
		}else{
            controls[0].style.top = '0px';
            controls[1].style.bottom = '0px';
            sublites.style.bottom = '65px';
        }
    }
    function startSublites(e){
        if(e){
            function start(){
                if(playerElement.textTracks){			
                    var track = playerElement.textTracks[0];
                    track.mode = 'hidden';
                    var cue;
                    track.oncuechange = function(e) {
                        cue = this.activeCues[0];
                        if(cue){
                            var time  = cue.endTime;
                            var text  = cue.text;
                            var align = cue.align;
                            sublites.innerHTML = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
                            sublites.style.opacity = '1';
                            sublites.style.textAlign = align;
                            playerElement.ontimeupdate = function(){
                                if(playerElement.currentTime >= time){
                                    sublites.style.opacity = '0';
                                }
                            }
                        }
                    }
                } 
            }
            track      = document.createElement("track");
		    //track.kind = "pt";
	    	track.src  = 'functions/download/?dir=' + e;
            playerElement.appendChild(track);
            start();
        }else{
            sublites.style.opacity = '0';
            sublites.innerHTML = '';
        }
    }
    function toggleVideoAudio(type, src, title, sublite, play){
        loader.style.display  = "block";
        if(playerElement) delete playerElement;
        media.innerHTML       = '';
        titleplayer.innerHTML = title;
        playerElement         = document.createElement(type);
        media.appendChild(playerElement);

		playerElement.addEventListener('loadeddata', function(){
            this.currentTime      = 0;
            loader.style.display  = "none";
            DOMPlayer(play);
        }, false);
        
        playerElement.controls = false;
		playerElement.src      = 'functions/download/?dir=' + src;
		playerElement.preload  = "auto";
        playerElement.load();
        
        startSublites(sublite);

        player.setAttribute("class", type);
        
    }
    function playlist(e){
        if(e == false){
            sources = listsource.querySelectorAll("li");
            for (var index = 0; index < sources.length; index++){
                sources[index].querySelector('a').onclick = function(){
                    listsource.querySelector(".active").classList.remove("active");
                    this.parentElement.classList.add("active");
                    activeSource = Array.prototype.indexOf.call(this.parentElement.parentNode.children, this.parentElement);
                    run(this);
                }
            }
            previous.onclick = function(){
                listsource.querySelector(".active").classList.remove("active")
                activeSource--;
                if(activeSource == (-1)){
                    activeSource = (sources.length -1);
                }
                sources[activeSource].classList.add("active");
                source = sources[activeSource].querySelector('a');

                run(source);
            }
            next.onclick = function(){
                listsource.querySelector(".active").classList.remove("active");
                activeSource++;
                if(sources.length == activeSource){
                    activeSource = 0;
                }
                sources[activeSource].classList.add("active");
                source = sources[activeSource].querySelector('a');

                run(source);
            }
        }else{
            listsource.querySelector(".active").classList.remove("active");
            activeSource++;
            if(sources.length == activeSource){
                activeSource = 0;
            }
            sources[activeSource].classList.add("active");
            source = sources[activeSource].querySelector('a');

            run(source);
        }
        function run(e){
            toggleVideoAudio(
                e.getAttribute('data-type'), 
                e.getAttribute('data-src'), 
                e.getAttribute('data-title'), 
                ((e.getAttribute('data-sublite')) ? e.getAttribute('data-sublite') : false),
                true
            );
        }
    }
    function generateList(e, add){
        if(add == false){
            listsource.innerHTML = '';
            sublites.innerHTML = '';
            sublites.style.opacity = '0';
            toggleVideoAudio(
                e[0]['type'], 
                e[0]['src'], 
                e[0]['title'], 
                ((e[0]['sublite']) ? e[0]['sublite'] : false),
                false
            );
        }
        for(index = 0; index < e.length; index++){

            li    = document.createElement('li');
            a     = document.createElement('a');
            title = document.createTextNode(e[index]['title']);

            if(index == 0 && add == false) li.setAttribute("class",  "active");
            
            a.setAttribute("data-type",  e[index]['type']);
            a.setAttribute("data-src",   e[index]['src']);
            a.setAttribute("data-title", e[index]['title']);

            if(e[index]['sublite']){
                a.setAttribute("data-sublite", + e[index]['sublite']);
            }
            a.appendChild(title);
            li.appendChild(a);
            listsource.appendChild(li);
        }
        playlist(false);
        
    }
    //visual 
    preferences.onclick    = function(){slideShowConfig()}
    showplaylist.onclick   = function(){slideShowPlaylist()}
    hidepref.onclick       = function(){slideShowConfig()}
    hideplaylist.onclick   = function(){slideShowPlaylist()}
    expandplaylist.onclick = function(){
        if(inputexpand.checked == true){
            inputexpand.checked = false;
        }else{
            inputexpand.checked = true;
        }
    }
    function slideShowPlaylist(){
        if(inputexpand.checked == true){
            inputexpand.checked = false;
        }
       
        if(inputplaylist.checked == true){
            inputplaylist.checked = false;
        }else{            
            inputplaylist.checked = true;
        }
    }
    function slideShowConfig(){
        if(inputsettings.checked == true){
            inputsettings.checked = false;
        }else{
            inputsettings.checked = true;
        }
    }
    generateList(playlistArray, add);
}
