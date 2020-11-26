function degreeConv(e) {
    console.log(e.target.parentNode);
    let f = e.target.parentNode.firstElementChild;
    let c = e.target.parentNode.lastElementChild;
    if(e.target == f) {
        if(e.target.className == 'header__letter active'){
            e.target.className = 'header__letter';
            c.className = 'header__letter active'; 
        }
        else {
            e.target.className = 'header__letter active'
            c.className = 'header__letter';
        }
    };
    if(e.target == c) {
        if(e.target.className == 'header__letter active'){
            e.target.className = 'header__letter';
            f.className = 'header__letter active'; 
        }
        else {
            e.target.className = 'header__letter active'
            f.className = 'header__letter';
        }
    };
};

export { degreeConv };