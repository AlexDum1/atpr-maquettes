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
      const reponse = await fetch('./data/agenda.json');
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

  const AUTRES = 'Autres régions';

  /* Initiales pour l'avatar générique uniformisé (fallback si pas de photo). */
  function initiales(prenom, nom) {
    const p = (prenom || '').trim().charAt(0);
    const n = (nom || '').trim().charAt(0);
    return (p + n).toUpperCase() || '?';
  }

  function avatarFiche(t) {
    const wrap = el('div', 'fiche__avatar');
    if (t.photo) {
      const img = document.createElement('img');
      img.src = t.photo;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 72;
      img.height = 72;
      wrap.appendChild(img);
    } else {
      wrap.classList.add('fiche__avatar--initiales');
      wrap.setAttribute('aria-hidden', 'true');
      wrap.appendChild(el('span', null, initiales(t.prenom, t.nom)));
    }
    return wrap;
  }

  async function rendreAnnuaire(conteneur) {
    etatChargement(conteneur, 'Chargement de l’annuaire…');
    try {
      const reponse = await fetch('./data/annuaire.json');
      if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
      const donnees = await reponse.json();

      const therapeutes = [...(donnees.therapeutes || [])];

      conteneur.textContent = '';
      if (!therapeutes.length) {
        etatErreur(conteneur, 'L’annuaire sera publié prochainement.');
        return;
      }

      /* Regroupement : par département pour l'Occitanie, sinon « Autres régions » */
      const groupes = new Map();
      therapeutes.forEach((t) => {
        const cle = t.region === 'Occitanie'
          ? (t.departement || 'Occitanie')
          : AUTRES;
        if (!groupes.has(cle)) groupes.set(cle, []);
        groupes.get(cle).push(t);
      });

      /* Ordre : départements d'Occitanie (alphabétique), puis « Autres régions » */
      const cles = [...groupes.keys()]
        .filter((c) => c !== AUTRES)
        .sort((a, b) => a.localeCompare(b, 'fr'));
      if (groupes.has(AUTRES)) cles.push(AUTRES);

      const triNom = (a, b) =>
        (a.nom || '').localeCompare(b.nom || '', 'fr') ||
        (a.prenom || '').localeCompare(b.prenom || '', 'fr');

      cles.forEach((cle) => {
        const section = el('section', 'annuaire-region');
        section.appendChild(el('h2', 'annuaire-region__titre', cle));

        const liste = el('ul', 'annuaire-region__fiches');
        groupes
          .get(cle)
          .sort(triNom)
          .forEach((t) => {
            const li = el('li');
            const art = el('article', 'fiche');

            art.appendChild(avatarFiche(t));

            const corps = el('div', 'fiche__corps');

            const nom = el('h3', 'fiche__nom');
            if (t.exemple) {
              nom.appendChild(el('span', 'badge-note', 'Exemple'));
              nom.appendChild(document.createTextNode(' '));
            }
            nom.appendChild(document.createTextNode(
              [t.prenom, t.nom].filter(Boolean).join(' ')
            ));
            corps.appendChild(nom);

            const lieuTxt = [t.ville, t.departement].filter(Boolean).join(' · ');
            if (lieuTxt) corps.appendChild(el('p', 'fiche__lieu', lieuTxt));

            if (t.specialite) corps.appendChild(el('p', 'fiche__spe', t.specialite));

            const badges = el('div', 'fiche__badges');
            (t.modalites || []).forEach((m) => {
              const modalite = MODALITES[m];
              if (modalite) badges.appendChild(el('span', 'badge ' + modalite.classe, modalite.label));
            });
            if (badges.childNodes.length) corps.appendChild(badges);

            if (t.adresse) {
              const adr = el('p', 'fiche__adresse');
              adr.appendChild(el('span', 'fiche__label', 'Adresse'));
              adr.appendChild(document.createTextNode(t.adresse));
              corps.appendChild(adr);
            }

            const liens = t.liens || {};
            const reseaux = liens.reseaux || [];
            if (liens.site || reseaux.length) {
              const ul = el('ul', 'fiche__liens');
              if (liens.site) {
                const li2 = el('li');
                const a = document.createElement('a');
                a.href = liens.site;
                a.textContent = 'Site internet';
                a.rel = 'noopener';
                a.target = '_blank';
                li2.appendChild(a);
                ul.appendChild(li2);
              }
              reseaux.forEach((r) => {
                if (!r || !r.url) return;
                const li2 = el('li');
                const a = document.createElement('a');
                a.href = r.url;
                a.textContent = r.type || 'Réseau';
                a.rel = 'noopener';
                a.target = '_blank';
                li2.appendChild(a);
                ul.appendChild(li2);
              });
              corps.appendChild(ul);
            }

            if (t.contact) {
              const p = el('p', 'fiche__contact');
              const a = document.createElement('a');
              a.href = 'mailto:' + t.contact;
              a.textContent = t.contact;
              p.appendChild(a);
              corps.appendChild(p);
            }

            art.appendChild(corps);
            li.appendChild(art);
            liste.appendChild(li);
          });

        section.appendChild(liste);
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
