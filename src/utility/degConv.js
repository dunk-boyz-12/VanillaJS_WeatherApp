function degreeConv(e) {
    const container = e.target.parentNode;
    const n1 = container.children[0];
    const n2 = container.children[1];
    if(e.target.id === n1.id) {
        n1.className = 'conv-container__letter active';
        n2.className = 'conv-container__letter';
    }
    else if(e.target.id === n2.id) {
        n2.className = 'conv-container__letter active';
        n1.className = 'conv-container__letter';
    };
};

export { degreeConv };