/* Maquette 1 — « La Maison »
   Menu mobile accessible, scroll-spy du sommaire PSR,
   rendu Agenda + Annuaire depuis ../data/*.json (chemins relatifs).
   Chaque module ne s'exécute que si son conteneur existe. */
(function () {
  'use strict';

  /* ---------- Utilitaires ---------- */

  var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  var JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  function echapper(texte) {
    return String(texte == null ? '' : texte)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* « [EXEMPLE] Titre » → titre propre + badge discret (après, pour ne pas
     décaler la ligne de base ni provoquer de césure du nom) */
  function badgeExemple(texte) {
    var brut = String(texte || '');
    if (brut.indexOf('[EXEMPLE]') === 0) {
      return echapper(brut.slice(9).trim()) +
        ' <span class="badge-maquette">Exemple</span>';
    }
    return echapper(brut);
  }

  /* « 2026-09-18 » → « vendredi 18 septembre 2026 » (sans dérive de fuseau) */
  function dateFrancaise(iso) {
    var p = String(iso || '').split('-');
    if (p.length !== 3) { return echapper(iso); }
    var a = parseInt(p[0], 10), m = parseInt(p[1], 10), j = parseInt(p[2], 10);
    var d = new Date(a, m - 1, j);
    return JOURS[d.getDay()] + ' ' + j + ' ' + MOIS[m - 1] + ' ' + a;
  }

  function moisAnnee(iso) {
    var p = String(iso || '').split('-');
    if (p.length !== 3) { return ''; }
    var libelle = MOIS[parseInt(p[1], 10) - 1] + ' ' + p[0];
    return libelle.charAt(0).toUpperCase() + libelle.slice(1);
  }

  function chargerJson(url, conteneur, rendre, messageErreur) {
    conteneur.innerHTML = '<p class="etat-chargement" role="status">Chargement…</p>';
    fetch(url)
      .then(function (rep) {
        if (!rep.ok) { throw new Error('HTTP ' + rep.status); }
        return rep.json();
      })
      .then(function (donnees) { rendre(donnees); })
      .catch(function () {
        conteneur.innerHTML = '<p class="etat-chargement" role="status">' + messageErreur + '</p>';
      });
  }

  /* ---------- 1. Menu mobile accessible ---------- */

  function initMenu() {
    var entete = document.querySelector('.site-header');
    var bouton = document.querySelector('.nav-toggle');
    var nav = document.getElementById('nav-principale');
    if (!entete || !bouton || !nav) { return; }

    function fermer() {
      entete.classList.remove('est-ouvert');
      bouton.setAttribute('aria-expanded', 'false');
    }

    bouton.addEventListener('click', function () {
      var ouvert = bouton.getAttribute('aria-expanded') === 'true';
      if (ouvert) {
        fermer();
      } else {
        entete.classList.add('est-ouvert');
        bouton.setAttribute('aria-expanded', 'true');
      }
    });

    /* Échap : fermer et rendre le focus au bouton */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') {
        fermer();
        bouton.focus();
      }
    });

    /* Clic hors du header : fermer */
    document.addEventListener('click', function (e) {
      if (bouton.getAttribute('aria-expanded') === 'true' && !entete.contains(e.target)) {
        fermer();
      }
    });

    /* Suivre un lien (ancre) : fermer */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { fermer(); }
    });
  }

  /* ---------- 2. Scroll-spy du sommaire PSR (léger) ---------- */

  function initSommaire() {
    var sommaire = document.querySelector('.sommaire-psr');
    if (!sommaire || !('IntersectionObserver' in window)) { return; }

    var liens = Array.prototype.slice.call(sommaire.querySelectorAll('a[href^="#"]'));
    var cibles = liens
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);
    if (!cibles.length) { return; }

    function activer(id) {
      liens.forEach(function (a) {
        var actif = a.getAttribute('href') === '#' + id;
        a.classList.toggle('est-actif', actif);
        if (actif) { a.setAttribute('aria-current', 'true'); }
        else { a.removeAttribute('aria-current'); }
      });
    }

    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) { activer(entree.target.id); }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    cibles.forEach(function (c) { observateur.observe(c); });
  }

  /* ---------- 3. Agenda (../data/agenda.json) ---------- */

  var LIBELLES_TYPE = {
    supervision: 'Supervision',
    intervision: 'Intervision',
    evenement: 'Événement'
  };

  function badgesEvenement(ev) {
    var type = String(ev.type || 'evenement');
    var html = '<span class="badge badge--' + echapper(type) + '">' +
      echapper(LIBELLES_TYPE[type] || type) + '</span>';
    if (ev.modalite) {
      html += ' <span class="badge badge--modalite">' + echapper(ev.modalite) + '</span>';
    }
    return html;
  }

  function rendreAgenda(conteneur, donnees) {
    var evenements = (donnees && donnees.evenements ? donnees.evenements.slice() : [])
      .sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });

    if (!evenements.length) {
      conteneur.innerHTML = '<p class="etat-chargement">Aucune date n’est programmée pour le moment.</p>';
      return;
    }

    /* Regroupement par mois, dates croissantes */
    var groupes = [];
    evenements.forEach(function (ev) {
      var cle = moisAnnee(ev.date);
      var dernier = groupes[groupes.length - 1];
      if (!dernier || dernier.cle !== cle) {
        dernier = { cle: cle, evenements: [] };
        groupes.push(dernier);
      }
      dernier.evenements.push(ev);
    });

    var html = groupes.map(function (groupe) {
      var lignes = groupe.evenements.map(function (ev) {
        return '<article class="evenement">' +
          '<div>' +
            '<p class="evenement-date">' + dateFrancaise(ev.date) + '</p>' +
            (ev.heure ? '<p class="evenement-heure">' + echapper(ev.heure) + '</p>' : '') +
          '</div>' +
          '<div>' +
            '<h4>' + badgeExemple(ev.titre) + '</h4>' +
            '<p class="evenement-meta">' + badgesEvenement(ev) +
              (ev.lieu ? ' <span class="evenement-lieu">' + echapper(ev.lieu) + '</span>' : '') +
            '</p>' +
            (ev.description ? '<p class="evenement-desc">' + echapper(ev.description) + '</p>' : '') +
          '</div>' +
        '</article>';
      }).join('');
      return '<section class="agenda-mois">' +
        '<h3 class="agenda-mois-titre">' + echapper(groupe.cle) + '</h3>' + lignes +
      '</section>';
    }).join('');

    conteneur.innerHTML = html;
  }

  function initAgenda() {
    var conteneur = document.getElementById('agenda-liste');
    if (!conteneur) { return; }
    chargerJson('../data/agenda.json', conteneur, function (donnees) {
      rendreAgenda(conteneur, donnees);
    }, 'L’agenda n’a pas pu être chargé. Rechargez la page pour réessayer.');
  }

  /* ---------- 4. Annuaire (../data/annuaire.json) ---------- */

  function rendreAnnuaire(conteneur, donnees) {
    var therapeutes = (donnees && donnees.therapeutes ? donnees.therapeutes.slice() : []);
    if (!therapeutes.length) {
      conteneur.innerHTML = '<p class="etat-chargement">L’annuaire est en cours de constitution.</p>';
      return;
    }

    /* Regroupement par région (ordre alphabétique), puis par nom */
    var regions = {};
    therapeutes.forEach(function (t) {
      var region = t.region || 'Autres régions';
      (regions[region] = regions[region] || []).push(t);
    });

    var html = Object.keys(regions).sort(function (a, b) {
      return a.localeCompare(b, 'fr');
    }).map(function (region) {
      var fiches = regions[region].sort(function (a, b) {
        return String(a.nom).localeCompare(String(b.nom), 'fr');
      }).map(function (t) {
        var badges = (t.modalites || []).map(function (m) {
          return '<span class="badge badge--modalite">' + echapper(m) + '</span>';
        }).join(' ');
        return '<article class="carte-trait fiche-therapeute">' +
          '<h4>' + badgeExemple(t.nom) + '</h4>' +
          '<p class="fiche-ville">' + echapper(t.ville) + '</p>' +
          (t.publics ? '<p class="fiche-publics">' + echapper(t.publics) + '</p>' : '') +
          '<div class="fiche-badges">' + badges + '</div>' +
          (t.contact
            ? '<a class="lien-anime" href="mailto:' + echapper(t.contact) + '">Contacter' +
              '<span class="visuallyhidden"> ' + echapper(String(t.nom || '').replace('[EXEMPLE]', '').trim()) + '</span></a>'
            : '') +
        '</article>';
      }).join('');
      return '<section class="annuaire-region">' +
        '<h3 class="annuaire-region-titre">' + echapper(region) + '</h3>' +
        '<div class="annuaire-grille">' + fiches + '</div>' +
      '</section>';
    }).join('');

    conteneur.innerHTML = html;
  }

  function initAnnuaire() {
    var conteneur = document.getElementById('annuaire-liste');
    if (!conteneur) { return; }
    chargerJson('../data/annuaire.json', conteneur, function (donnees) {
      rendreAnnuaire(conteneur, donnees);
    }, 'L’annuaire n’a pas pu être chargé. Rechargez la page pour réessayer.');
  }

  /* ---------- 5. Formulaire de démonstration (contact) ---------- */

  function initFormulaireDemo() {
    var form = document.querySelector('form.formulaire');
    if (!form) { return; }
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    var bouton = form.querySelector('[aria-disabled="true"]');
    if (bouton) {
      bouton.addEventListener('click', function (e) { e.preventDefault(); });
    }
  }

  /* ---------- Lancement ---------- */

  function init() {
    initMenu();
    initSommaire();
    initAgenda();
    initAnnuaire();
    initFormulaireDemo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
