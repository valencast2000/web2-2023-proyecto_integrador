document.addEventListener('DOMContentLoaded', onStart);

function onStart() {
    const navbarContainer = document.getElementById('navbarContainer');

    // Crear elementos y establecer sus atributos y clases
    const divNavbar = document.createElement('div');
    divNavbar.className = 'div-navbar';

    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg bg-light';

    const containerFluid = document.createElement('div');
    containerFluid.className = 'container-fluid';

    const collapseDiv = document.createElement('div');
    collapseDiv.className = 'collapse navbar-collapse';
    collapseDiv.id = 'navbarSupportedContent';

    const ulLeft = document.createElement('ul');
    ulLeft.className = 'navbar-nav me-auto mb-2 mb-lg-0';

    const li1 = document.createElement('li');
    li1.className = 'nav-item';
    const a1 = document.createElement('a');
    if(window.location.href.split("/views/")[1]=="dietasAdmin.html"){
        a1.className = 'nav-link active';
    } else {
        a1.className = 'nav-link';
    }
    a1.setAttribute('aria-current', 'page');
    a1.href = 'dietasAdmin.html';
    a1.textContent = 'Dietas';
    li1.appendChild(a1);


    const li2 = document.createElement('li');
    li2.className = 'nav-item';
    const a2 = document.createElement('a');
    if(window.location.href.split("/views/")[1]=="gestorUsuariosAdmin.html"){
        a2.className = 'nav-link active';
    } else {
        a2.className = 'nav-link';
    }
    a2.setAttribute('aria-current', 'page');
    a2.href = 'gestorUsuariosAdmin.html';
    a2.textContent = 'Usuarios';
    li2.appendChild(a2);

    ulLeft.appendChild(li1);
    ulLeft.appendChild(li2);

    const ulRight = document.createElement('ul');
    ulRight.className = 'nav navbar-nav ms-auto';

    const liRight = document.createElement('li');
    liRight.className = 'nav-item';
    const aRight = document.createElement('a');
    aRight.className = 'nav-link';
    aRight.setAttribute('aria-current', 'page');
    aRight.href = 'index.html';
    aRight.textContent = 'Cerrar Sesión';
    liRight.appendChild(aRight);

    ulRight.appendChild(liRight);

    collapseDiv.appendChild(ulLeft);
    collapseDiv.appendChild(ulRight);

    containerFluid.appendChild(collapseDiv);

    nav.appendChild(containerFluid);

    divNavbar.appendChild(nav);

    // Agregar la navbar al documento
    navbarContainer.appendChild(divNavbar);
}

