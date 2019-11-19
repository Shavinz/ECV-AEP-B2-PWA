/* Attendre le chargement du DOM */
document.addEventListener( 'DOMContentLoaded', () => {

	

    /* Déclarations */
    let myNav = document.querySelector('nav ul');
    let myBurgerMenu = document.querySelector('nav button');

    /* Méthodes / Fonctions */
        // Créer une fonction pour générer la navigation
        const loadNavData = () => {
            //Charger le fichier nav.json
            fetch('./data/nav.json')
            .then(data => {
                //Vérifier si la requête a fonctionné
                if(data.ok){
                    return data.json();
                }
            })
            .then(jsonData => {
                displayNav(jsonData);
            })
            .catch(err => {
                console.error(err);
            });
        };

        //Créer une fonction pour afficher la navigation
        const displayNav = (navCollection) => {
            //Faire une boucle sur la collection
            for(let link of navCollection){
                //Ajouter une balise LI avec une balise A dans NAV UL
                myNav.innerHTML += `
                <li><a href="${link.href}">${link.content}</a></li>
                `;
            };

            //Activer la navigation
			toggleNavigation();
			
			// Capter le click sur les balises NAV a
			for (let link of document.querySelectorAll('nav a')) {
				link.addEventListener( 'click', (event) => {
					// Bloquer le comportement naturel de la balise a
					event.preventDefault();

					// afficher la page
					displayPage(link.getAttribute('href'))
				})
			};
        };

        //Créer une fonction pour ouvrir / fermer la navigation
        const toggleNavigation = () => {
            //Capter le clic sur burgerMenu
            myBurgerMenu.addEventListener('click', () => {
                //Ajouter ou supprimer la classe open sur nav ul
				myNav.classList.toggle('open');
				myBurgerMenu.classList.toggle('open');
            });

		}
		
		// créer une fonction pour charger le contenu des pages
		const displayPage = ( page ) => {
			// Charger le contenue de la page
			fetch( page )
			.then( data => {
				if( data.ok ){
					return data.text();
				}
			} )
			.then( text => {
				//ajouter le contenu dans le MAIN
				document.querySelector('main').innerHTML = text;

				// fermer la navigation
				myNav.classList.remove('open');
				myBurgerMenu.classList.remove('open');
			})
			.catch( err => {
				console.error(err);
			});

		}; 

    /* Lancer l'IHM (interface homme - machine) */
        //Charger la navigation
        loadNavData();
});