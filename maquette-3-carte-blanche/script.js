/* =============================================================
   MAQUETTE 3 — « CARTE BLANCHE » · comportements
   - Menu mobile accessible (aria-expanded, Échap)
   - Scroll-spy discret du sommaire (page « La PSR »)
   - Rendu Agenda depuis ../data/agenda.json
   - Rendu Annuaire depuis ../data/annuaire.json
   Chaque module ne s'exécute que si son conteneur existe.
   ============================================================= */

(() => {
  'use strict';

  /* ----------  Menu mobile  ---------- */

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav-principale');

  if (toggle && nav) {
    const fermer = () => {
      nav.classList.remove('est-ouverte');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const ouvert = nav.classList.toggle('est-ouverte');
      toggle.setAttribute('aria-expanded', String(ouvert));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('est-ouverte')) {
        fermer();
        toggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        nav.classList.contains('est-ouverte') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        fermer();
      }
    });
  }

  /* ----------  Scroll-spy du sommaire (si présent)  ---------- */

  const sommaire = document.querySelector('.sommaire');
  if (sommaire && 'IntersectionObserver' in window) {
    const liens = Array.from(sommaire.querySelectorAll('a[href^="#"]'));
    const cibles = liens
      .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);

    if (cibles.length) {
      const activer = (id) => {
        liens.forEach((a) => {
          const actif = a.getAttribute('href') === '#' + id;
          a.classList.toggle('est-active', actif);
          if (actif) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      };
      const observateur = new IntersectionObserver(
        (entrees) => {
          const visible = entrees.find((e) => e.isIntersecting);
          if (visible) activer(visible.target.id);
        },
        { rootMargin: '-20% 0px -65% 0px' }
      );
      cibles.forEach((c) => observateur.observe(c));
    }
  }

  /* ----------  Utilitaires communs Agenda / Annuaire  ---------- */

  const fmtDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const fmtMois = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
  const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function el(tag, classe, texte) {
    const n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texte != null) n.textContent = texte;
    return n;
  }

  /* Sépare un éventuel marqueur "[EXEMPLE] …" du texte, pour l'afficher en badge. */
  function extraireMarqueur(txt) {
    const m = String(txt).match(/^\[([^\]]+)\]\s*/);
    if (!m) return { badge: null, texte: txt };
    const label = m[1] === 'EXEMPLE' ? 'Exemple' : m[1];
    return { badge: label, texte: String(txt).slice(m[0].length) };
  }

  function titreAvecMarqueur(tag, classe, brut) {
    const { badge, texte } = extraireMarqueur(brut);
    const h = el(tag, classe);
    if (badge) {
      const b = el('span', 'badge-note', badge);
      h.appendChild(b);
      h.appendChild(document.createTextNode(' '));
    }
    h.appendChild(document.createTextNode(texte));
    return h;
  }

  function etatChargement(conteneur, message) {
    conteneur.textContent = '';
    conteneur.appendChild(el('p', 'etat-chargement', message));
  }

  function etatErreur(conteneur, message) {
    conteneur.textContent = '';
    const p = el('p', 'etat-chargement', message);
    conteneur.appendChild(p);
  }

  /* ----------  Agenda  ---------- */

  const TYPES = {
    supervision: { label: 'Supervision', classe: 'badge--supervision' },
    intervision: { label: 'Intervision', classe: 'badge--intervision' },
    evenement: { label: 'Événement', classe: 'badge--evenement' },
  };
  const MODALITES = {
    'présentiel': { label: 'Présentiel', classe: 'badge--presentiel' },
    visio: { label: 'Visio', classe: 'badge--visio' },
  };

  async function rendreAgenda(conteneur) {
    etatChargement(conteneur, 'Chargement de l’agenda…');
    try {
      const reponse = await fetch('../data/agenda.json');
      if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
      const donnees = await reponse.json();

      const evenements = [...(donnees.evenements || [])].sort((a, b) =>
        String(a.date).localeCompare(String(b.date))
      );

      conteneur.textContent = '';
      if (!evenements.length) {
        etatErreur(conteneur, 'Aucun événement programmé pour le moment.');
        return;
      }

      /* Regroupement par mois, dates croissantes */
      const groupes = new Map();
      evenements.forEach((evt) => {
        const cle = String(evt.date).slice(0, 7);
        if (!groupes.has(cle)) groupes.set(cle, []);
        groupes.get(cle).push(evt);
      });

      groupes.forEach((liste, cle) => {
        const section = el('section', 'groupe-mois');
        const dateRef = new Date(cle + '-01T12:00:00');
        section.appendChild(el('h2', 'groupe-mois__titre', majuscule(fmtMois.format(dateRef))));

        liste.forEach((evt) => {
          const art = el('article', 'evenement');

          const colDate = el('div', 'evenement__date-col');
          const meta = el('p', 'evenement__meta');
          const time = document.createElement('time');
          time.dateTime = evt.date;
          const strong = el('strong', null, majuscule(fmtDate.format(new Date(evt.date + 'T12:00:00'))));
          time.appendChild(strong);
          meta.appendChild(time);
          if (evt.heure) meta.appendChild(document.createTextNode(' · ' + evt.heure));
          colDate.appendChild(meta);

          const badges = el('div', 'evenement__badges');
          const type = TYPES[evt.type];
          if (type) badges.appendChild(el('span', 'badge ' + type.classe, type.label));
          const modalite = MODALITES[evt.modalite];
          if (modalite) badges.appendChild(el('span', 'badge ' + modalite.classe, modalite.label));
          colDate.appendChild(badges);

          const corps = el('div', 'evenement__corps');
          corps.appendChild(titreAvecMarqueur('h3', 'evenement__titre', evt.titre));
          if (evt.lieu) {
            corps.appendChild(el('p', 'evenement__meta', evt.lieu));
          }
          if (evt.description) {
            corps.appendChild(el('p', 'evenement__desc', evt.description));
          }

          art.appendChild(colDate);
          art.appendChild(corps);
          section.appendChild(art);
        });

        conteneur.appendChild(section);
      });
    } catch (erreur) {
      etatErreur(
        conteneur,
        'L’agenda n’a pas pu être chargé. Rechargez la page ou réessayez plus tard.'
      );
    }
  }

  /* ----------  Annuaire  ---------- */

  async function rendreAnnuaire(conteneur) {
    etatChargement(conteneur, 'Chargement de l’annuaire…');
    try {
      const reponse = await fetch('../data/annuaire.json');
      if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
      const donnees = await reponse.json();

      const nomTri = (t) => extraireMarqueur(t.nom).texte;
      const therapeutes = [...(donnees.therapeutes || [])];

      conteneur.textContent = '';
      if (!therapeutes.length) {
        etatErreur(conteneur, 'L’annuaire sera publié prochainement.');
        return;
      }

      /* Regroupement par région (ordre alphabétique), puis par nom */
      const groupes = new Map();
      therapeutes.forEach((t) => {
        const region = t.region || 'Autre région';
        if (!groupes.has(region)) groupes.set(region, []);
        groupes.get(region).push(t);
      });
      const regions = [...groupes.keys()].sort((a, b) => a.localeCompare(b, 'fr'));

      regions.forEach((region) => {
        const section = el('section', 'groupe-region');
        section.appendChild(el('h2', 'groupe-region__titre', region));

        groupes
          .get(region)
          .sort((a, b) => nomTri(a).localeCompare(nomTri(b), 'fr'))
          .forEach((t) => {
            const art = el('article', 'fiche-therapeute');

            const identite = el('div', 'fiche-therapeute__identite');
            identite.appendChild(titreAvecMarqueur('h3', 'fiche-therapeute__nom', t.nom));
            identite.appendChild(el('p', 'fiche-therapeute__ville', t.ville));

            const badges = el('div', 'fiche-therapeute__badges');
            (t.modalites || []).forEach((m) => {
              const modalite = MODALITES[m];
              if (modalite) badges.appendChild(el('span', 'badge ' + modalite.classe, modalite.label));
            });

            const meta = el('div', 'fiche-therapeute__meta');
            if (t.publics) meta.appendChild(el('p', null, t.publics));
            if (t.contact) {
              const p = el('p');
              const a = document.createElement('a');
              a.href = 'mailto:' + t.contact;
              a.textContent = t.contact;
              p.appendChild(a);
              meta.appendChild(p);
            }

            art.appendChild(identite);
            art.appendChild(badges);
            art.appendChild(meta);
            section.appendChild(art);
          });

        conteneur.appendChild(section);
      });
    } catch (erreur) {
      etatErreur(
        conteneur,
        'L’annuaire n’a pas pu être chargé. Rechargez la page ou réessayez plus tard.'
      );
    }
  }

  /* ----------  Formulaire de démonstration (contact)  ---------- */

  const formulaireDemo = document.querySelector('.formulaire-demo');
  if (formulaireDemo) {
    formulaireDemo.addEventListener('submit', (e) => e.preventDefault());
    const boutonDemo = formulaireDemo.querySelector('[aria-disabled="true"]');
    if (boutonDemo) {
      boutonDemo.addEventListener('click', (e) => e.preventDefault());
    }
  }

  /* ----------  Amorçage conditionnel  ---------- */

  const conteneurAgenda = document.getElementById('agenda-liste');
  if (conteneurAgenda) rendreAgenda(conteneurAgenda);

  const conteneurAnnuaire = document.getElementById('annuaire-liste');
  if (conteneurAnnuaire) rendreAnnuaire(conteneurAnnuaire);
})();
