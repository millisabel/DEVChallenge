function setPlayer(){
    const box = document.getElementById('video');
    const btn = document.getElementById('play');
    let iframe = null;

    btn.addEventListener('click', function(){
        initYoutubeAPI();
        box.classList.add('use__box--show');
        if(!iframe){
            iframe = createIFrame(box);
        }
        initPlayer(box);
    });
}

function initYoutubeAPI(){
    if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
        const tag = document.createElement('script');
        tag.id = 'www-widgetapi-script';
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

function initPlayer(box){
    let player;
    let done = false;

    window.onYouTubePlayerAPIReady = function () {
        onYouTubeIframeAPIReady();
    };


    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '500',
            width: '800',
            videoId: 'vnbN9V_2Guk',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
            }
        });
    }



    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED && !done) {
            done = true;
            box.classList.remove('use__box--show');
        }
        if(event.data == YT.PlayerState.ENDED && done){
            done = false;
            event.target.playVideo();
        }
    }
}

function createIFrame(parent){
    const iframe = document.createElement('iframe');
    iframe.id = 'video';
    iframe.allow = 'autoplay';
    iframe.mute = 1;
    parent.append(iframe);
    return iframe;
}
