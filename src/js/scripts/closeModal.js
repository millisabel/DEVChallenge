const modal = document.querySelector('.modal');
const btnModal = document.querySelector('.modal__btn');
const btnOpenModal = document.querySelector('.contact .btn--main');

btnModal.addEventListener('click', ()=> {
    modal.classList.add('modal--hidden');
    document.body.style.overflow = 'auto';
});

btnOpenModal.addEventListener('click', (e)=> {
    checkForm(e);
});

const checkForm = (e) => {
    const form = document.querySelector('.form');
    const name = form.querySelector('input[placeholder="Your name"]');
    const email = form.querySelector('input[placeholder="Email"]');
    const tel = form.querySelector('input[placeholder="Tell more"]');
    if(name.value && email.value && tel.value){
        e.preventDefault();
        modal.classList.remove('modal--hidden');
        document.body.style.overflow = 'hidden';
    }
};

