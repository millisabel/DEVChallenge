
//=require scripts/setTheme.js
//=require scripts/openMenu.js
//=require scripts/fixedHeader.js
//=require scripts/setWow.js
//=require scripts/setSlider.js
//=require scripts/player.js
//=require scripts/btnTop.js

window.addEventListener('load', function(){
    setTheme('.btn--theme', 'theme-is-black');
    setWow();
    openMenu();
    fixedHeader();
    btnTop('.home');
    setSlider();
    setPlayer();
});