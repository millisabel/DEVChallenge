function fixedHeader(){
    const header = document.querySelector('.header');
    const top = header.offsetTop;
    window.addEventListener('scroll', function(){
        if(window.pageYOffset > top){
            if(!header.classList.contains('header--fixed')){
                header.classList.add('header--fixed');
            }
        }
        if(!window.pageYOffset){
            if(header.classList.contains('header--fixed')){
                header.classList.remove('header--fixed');
            }
        }
    });
}