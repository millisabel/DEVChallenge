const setWow = () => {
    const wow = new WOW(
        {
            boxClass: 'wow',
            animateClass: 'animate__animated',
            offset:  100,
        }
    );
    wow.init();
};