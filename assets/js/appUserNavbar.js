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
    if(window.location.href.split("/views/")[1]=="dietasUsuario.html"){
        a1.className = 'nav-link active';
    } else {
        a1.className = 'nav-link';
    }
    a1.setAttribute('aria-current', 'page');
    a1.href = 'dietasUsuario.html';
    a1.textContent = 'Dietas';
    li1.appendChild(a1);



    const li2 = document.createElement('li');
    li2.className = 'nav-item';
    const a2 = document.createElement('a');

    if(window.location.href.split("/views/")[1]=="agendaUsuario.html"){
        a2.className = 'nav-link active';
    } else {
        a2.className = 'nav-link';
    }

    a2.setAttribute('aria-current', 'page');
    a2.href = 'agendaUsuario.html';
    a2.textContent = 'Agenda';
    li2.appendChild(a2);

    ulLeft.appendChild(li1);
    ulLeft.appendChild(li2);


    const ulCenter = document.createElement('ul');
    ulCenter.className = 'nav navbar-nav mx-auto';

    const liCenter = document.createElement('li');
    liCenter.className = 'nav-item';
    const h3Center = document.createElement('h3');
    h3Center.id = 'dieta-actual';
    liCenter.appendChild(h3Center);
    ulCenter.appendChild(liCenter);

    const ulRight = document.createElement('ul');
    ulRight.className = 'nav navbar-nav ms-auto';

    const liRight = document.createElement('li');
    liRight.className = 'nav-item dropdown';
    const aRight = document.createElement('a');
    aRight.className = 'nav-link dropdown-toggle';
    aRight.href = '#';
    aRight.role = 'button';
    aRight.setAttribute('data-bs-toggle', 'dropdown');
    aRight.setAttribute('aria-expanded', 'false');
    aRight.textContent = 'Mi cuenta';

    const ulDropdown = document.createElement('ul');
    ulDropdown.className = 'dropdown-menu dropdown-menu-end';

    const liDropdown1 = document.createElement('li');
    const aDropdown1 = document.createElement('a');
    aDropdown1.className = 'dropdown-item';
    aDropdown1.href = 'configuracionUsuario.html';
    aDropdown1.textContent = 'Configuración';
    liDropdown1.appendChild(aDropdown1);

    const liDivider = document.createElement('li');
    liDivider.appendChild(document.createElement('hr'));

    const liDropdown2 = document.createElement('li');
    const aDropdown2 = document.createElement('a');
    aDropdown2.className = 'dropdown-item';
    aDropdown2.href = 'index.html';
    aDropdown2.textContent = 'Cerrar sesión';




    liDropdown2.appendChild(aDropdown2);

    ulDropdown.appendChild(liDropdown1);
    ulDropdown.appendChild(liDivider);
    ulDropdown.appendChild(liDropdown2);

    liRight.appendChild(aRight);
    liRight.appendChild(ulDropdown);

    ulRight.appendChild(liRight);

    collapseDiv.appendChild(ulLeft);
    collapseDiv.appendChild(ulCenter);
    collapseDiv.appendChild(ulRight);

    containerFluid.appendChild(collapseDiv);

    nav.appendChild(containerFluid);

    divNavbar.appendChild(nav);

    // Agregar la navbar al documento
    navbarContainer.appendChild(divNavbar);

}

