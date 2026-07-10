/* ============================================================
   Maquette 2 — « Aquarelle » — script.js
   1. Menu mobile accessible (aria-expanded, Échap)
   2. Apparitions au scroll très lentes (DA), une seule fois
   3. Rendu Agenda depuis ../data/agenda.json
   4. Rendu Annuaire depuis ../data/annuaire.json
   Chaque module ne s'exécute que si son conteneur existe.
   ============================================================ */
(function () {
  'use strict';

  var NBSP = ' ';
  var reduitMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 1. Menu mobile ---------- */
  function initMenuMobile() {
    var bouton = document.querySelector('.nav-toggle');
    var nav = document.getElementById('nav-principale');
    if (!bouton || !nav) return;

    function fermer() {
      bouton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('est-ouverte');
    }

    bouton.addEventListener('click', function () {
      var ouvert = bouton.getAttribute('aria-expanded') === 'true';
      bouton.setAttribute('aria-expanded', String(!ouvert));
      nav.classList.toggle('est-ouverte', !ouvert);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bouton.getAttribute('aria-expanded') === 'true') {
        fermer();
        bouton.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (bouton.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(e.target) && !bouton.contains(e.target)) fermer();
    });
  }

  /* ---------- 2. Apparitions au scroll ----------
     La page est entièrement visible par défaut (robuste : impression,
     captures pleine page, JS partiel). L'effet ne s'arme qu'au premier
     geste réel de l'utilisateur (molette, toucher, clavier) et uniquement
     sur les blocs encore entièrement sous la ligne de flottaison. */
  function initReveals() {
    var cibles = document.querySelectorAll('[data-reveal]');
    if (!cibles.length) return;
    if (reduitMotion.matches) return; // tout visible d'emblée

    var restants = null;
    var verifPrevue = false;

    /* Révèle tout bloc dont le haut a atteint 94 % de la hauteur de fenêtre.
       Piloté par le scroll (et non IntersectionObserver) pour ne jamais
       « sauter » un bloc lors d'un défilement rapide ou d'un saut d'ancre. */
    function verifier() {
      verifPrevue = false;
      var seuil = window.innerHeight * 0.94;
      restants = restants.filter(function (el) {
        if (el.getBoundingClientRect().top < seuil) {
          el.classList.add('est-visible');
          return false;
        }
        return true;
      });
      if (!restants.length) window.removeEventListener('scroll', surScroll);
    }

    function surScroll() {
      if (!verifPrevue) {
        verifPrevue = true;
        requestAnimationFrame(verifier);
      }
    }

    function armer() {
      if (restants) return;
      restants = Array.prototype.filter.call(cibles, function (el) {
        return el.getBoundingClientRect().top > window.innerHeight;
      });
      restants.forEach(function (el) { el.classList.add('reveal'); });
      if (restants.length) window.addEventListener('scroll', surScroll, { passive: true });
    }

    ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
      window.addEventListener(type, armer, { passive: true, once: true });
    });
  }

  /* ---------- Utilitaires de rendu ---------- */

  /* Sépare la marque [EXEMPLE] d'un texte et la rend en badge élégant. */
  function texteAvecBadge(texte) {
    var fragment = document.createDocumentFragment();
    var estExemple = /\[EXEMPLE\]\s*/.test(texte);
    var propre = texte.replace(/\[EXEMPLE\]\s*/g, '').trim();
    fragment.appendChild(document.createTextNode(propre));
    if (estExemple) {
      fragment.appendChild(document.createTextNode(' '));
      var badge = document.createElement('span');
      badge.className = 'badge-exemple';
      badge.textContent = 'Exemple';
      fragment.appendChild(badge);
    }
    return fragment;
  }

  function dateLongueFr(iso) {
    var d = new Date(iso + 'T12:00:00');
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(d);
  }

  function moisAnneeFr(iso) {
    var d = new Date(iso + 'T12:00:00');
    var libelle = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(d);
    return libelle.charAt(0).toUpperCase() + libelle.slice(1);
  }

  function badgeType(type) {
    var libelles = { supervision: 'Supervision', intervision: 'Intervision', evenement: 'Événement' };
    var span = document.createElement('span');
    span.className = 'badge-type badge-type--' + type;
    span.textContent = libelles[type] || type;
    return span;
  }

  function badgeModalite(modalite) {
    var span = document.createElement('span');
    span.className = 'badge-modalite';
    span.textContent = modalite.charAt(0).toUpperCase() + modalite.slice(1);
    return span;
  }

  function afficherChargement(conteneur) {
    var p = document.createElement('p');
    p.className = 'etat-chargement';
    p.textContent = 'Chargement en cours…';
    conteneur.appendChild(p);
    return p;
  }

  /* Trio de pétales décoratif (respiration DA au milieu des longues listes) */
  function creerPetaleRespiration() {
    var NS = 'http://www.w3.org/2000/svg';
    var D = 'M12 3.2 C15.4 6.7 16.8 10 16.8 13.4 A4.8 4.8 0 0 1 7.2 13.4 C7.2 10 8.6 6.7 12 3.2 Z';
    var div = document.createElement('div');
    div.className = 'petale-respiration';
    div.setAttribute('aria-hidden', 'true');
    [16, -22, 30].forEach(function (angle) {
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('focusable', 'false');
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', D);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('transform', 'rotate(' + angle + ' 12 12)');
      svg.appendChild(path);
      div.appendChild(svg);
    });
    return div;
  }

  function afficherErreur(conteneur, message) {
    conteneur.textContent = '';
    var p = document.createElement('p');
    p.className = 'etat-chargement';
    p.setAttribute('role', 'alert');
    p.textContent = message;
    conteneur.appendChild(p);
  }

  /* ---------- 3. Agenda ---------- */
  function initAgenda() {
    var conteneur = document.getElementById('agenda-liste');
    if (!conteneur) return;

    var chargement = afficherChargement(conteneur);

    fetch('../data/agenda.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (donnees) {
        chargement.remove();
        var evenements = (donnees.evenements || []).slice().sort(function (a, b) {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });
        if (!evenements.length) {
          afficherErreur(conteneur, 'Aucune date n’est programmée pour le moment.');
          return;
        }

        /* Regroupement par mois */
        var groupes = new Map();
        evenements.forEach(function (ev) {
          var cle = moisAnneeFr(ev.date);
          if (!groupes.has(cle)) groupes.set(cle, []);
          groupes.get(cle).push(ev);
        });

        var indexGroupe = 0;
        var miListe = Math.ceil(groupes.size / 2);
        groupes.forEach(function (liste, mois) {
          indexGroupe += 1;
          /* Respiration DA à mi-liste (uniquement si la liste est longue) */
          if (groupes.size >= 4 && indexGroupe === miListe + 1) {
            conteneur.appendChild(creerPetaleRespiration());
          }
          var section = document.createElement('section');
          section.className = 'agenda-groupe';

          var h = document.createElement('h3');
          h.className = 'agenda-groupe__mois';
          h.textContent = mois;
          section.appendChild(h);

          liste.forEach(function (ev) {
            var article = document.createElement('article');
            article.className = 'agenda-item';

            var date = document.createElement('p');
            date.className = 'agenda-item__date';
            var jour = document.createElement('span');
            jour.textContent = dateLongueFr(ev.date);
            date.appendChild(jour);
            if (ev.heure) {
              var heure = document.createElement('span');
              heure.className = 'agenda-item__heure';
              heure.textContent = ev.heure;
              date.appendChild(heure);
            }
            article.appendChild(date);

            /* Le badge « Exemple » rejoint la rangée de méta (jamais dans le
               titre : il y casserait la ligne sur les intitulés longs). */
            var estExemple = /\[EXEMPLE\]/.test(ev.titre);
            var titre = document.createElement('h4');
            titre.className = 'agenda-item__titre';
            titre.textContent = ev.titre.replace(/\[EXEMPLE\]\s*/g, '').trim();
            article.appendChild(titre);

            var meta = document.createElement('p');
            meta.className = 'agenda-item__meta';
            if (estExemple) {
              var badge = document.createElement('span');
              badge.className = 'badge-exemple';
              badge.textContent = 'Exemple';
              meta.appendChild(badge);
            }
            meta.appendChild(badgeType(ev.type));
            if (ev.modalite) meta.appendChild(badgeModalite(ev.modalite));
            if (ev.lieu) {
              var lieu = document.createElement('span');
              lieu.textContent = ev.lieu;
              meta.appendChild(lieu);
            }
            article.appendChild(meta);

            if (ev.description) {
              var desc = document.createElement('p');
              desc.className = 'agenda-item__desc';
              desc.textContent = ev.description;
              article.appendChild(desc);
            }

            section.appendChild(article);
          });

          conteneur.appendChild(section);
        });
      })
      .catch(function () {
        afficherErreur(conteneur, 'L’agenda n’a pas pu être chargé. Rechargez la page pour réessayer.');
      });
  }

  /* ---------- 4. Annuaire ---------- */
  function initAnnuaire() {
    var conteneur = document.getElementById('annuaire-liste');
    if (!conteneur) return;

    var chargement = afficherChargement(conteneur);

    fetch('../data/annuaire.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (donnees) {
        chargement.remove();
        var therapeutes = (donnees.therapeutes || []).slice();
        if (!therapeutes.length) {
          afficherErreur(conteneur, 'L’annuaire est en cours de constitution.');
          return;
        }

        /* Regroupement par région, régions et noms triés alphabétiquement */
        var groupes = new Map();
        therapeutes.forEach(function (t) {
          var region = t.region || 'Autres régions';
          if (!groupes.has(region)) groupes.set(region, []);
          groupes.get(region).push(t);
        });

        var regions = Array.from(groupes.keys()).sort(function (a, b) {
          return a.localeCompare(b, 'fr');
        });

        /* Alternance visuelle continue d'une fiche à l'autre (fond / radius),
           indépendante du découpage par région */
        var compteurFiches = 0;

        regions.forEach(function (region) {
          var fiches = groupes.get(region).slice().sort(function (a, b) {
            return a.nom.replace(/\[EXEMPLE\]\s*/g, '').localeCompare(b.nom.replace(/\[EXEMPLE\]\s*/g, ''), 'fr');
          });

          var section = document.createElement('section');
          section.className = 'annuaire-region';

          var h = document.createElement('h3');
          h.className = 'annuaire-region__nom';
          h.textContent = region;
          section.appendChild(h);

          var grille = document.createElement('div');
          grille.className = 'annuaire-region__fiches';

          fiches.forEach(function (t) {
            var fiche = document.createElement('article');
            fiche.className = 'fiche-therapeute';
            if (compteurFiches % 2 === 1) fiche.classList.add('fiche-therapeute--alt');
            compteurFiches += 1;

            var nom = document.createElement('h4');
            nom.className = 'fiche-therapeute__nom';
            nom.appendChild(texteAvecBadge(t.nom));
            fiche.appendChild(nom);

            var ville = document.createElement('p');
            ville.className = 'fiche-therapeute__ville';
            ville.textContent = t.ville;
            fiche.appendChild(ville);

            if (t.publics) {
              var publics = document.createElement('p');
              publics.className = 'fiche-therapeute__publics';
              publics.textContent = 'Publics' + NBSP + ':' + ' ' + t.publics;
              fiche.appendChild(publics);
            }

            if (t.modalites && t.modalites.length) {
              var modalites = document.createElement('p');
              modalites.className = 'fiche-therapeute__modalites';
              t.modalites.forEach(function (m) {
                modalites.appendChild(badgeModalite(m));
              });
              fiche.appendChild(modalites);
            }

            if (t.contact) {
              var contact = document.createElement('p');
              contact.className = 'fiche-therapeute__contact';
              var lien = document.createElement('a');
              lien.href = 'mailto:' + t.contact;
              lien.textContent = t.contact;
              contact.appendChild(lien);
              fiche.appendChild(contact);
            }

            grille.appendChild(fiche);
          });

          section.appendChild(grille);
          conteneur.appendChild(section);
        });
      })
      .catch(function () {
        afficherErreur(conteneur, 'L’annuaire n’a pas pu être chargé. Rechargez la page pour réessayer.');
      });
  }

  /* ---------- Initialisation ---------- */
  function init() {
    initMenuMobile();
    initReveals();
    initAgenda();
    initAnnuaire();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
