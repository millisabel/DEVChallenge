function openMenu(){
    const btn = document.querySelector('.btn--menu');
    const nav = document.querySelector(".header__nav");
    const link = nav.querySelectorAll('a');
    let btnClose = nav.querySelector(".btn--close");

    btn.addEventListener('click', toggleMenu);

    function toggleMenu(){

        if(!btnClose){
            createBtn(nav);
            handleLink(link);
        }

        nav.classList.toggle('open');
    }

    function createBtn(parent){
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn--close');
        btn.addEventListener('click', toggleMenu);
        parent.append(btn);
        return btn;
    }

    function handleLink(link){
        for (let i = 0; i < link.length; i++) {
            link[i].addEventListener('click', toggleMenu);
        }
    }
}