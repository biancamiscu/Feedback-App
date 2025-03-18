# Feedback-Continuu
Aplicația web permite profesorilor să creeze și să gestioneze activități de tip curs și oferă studenților posibilitatea de a oferi feedback în timp real, utilizând o interfață intuitivă. Profesorii definesc activitățile printr-un formular dedicat, unde introduc titlul activității, o descriere detaliată, data și ora la care se desfășoară. Pentru fiecare activitate se generează un cod unic, utilizat de studenți pentru a accesa sesiunea de feedback. Aceste informații sunt stocate într-o bază de date relațională MySQL, gestionată printr-un ORM pentru eficiență și ușurință în manipularea datelor.

Accesul studenților la o activitate se face prin introducerea codului unic într-un formular. Codul este verificat în baza de date pentru a confirma validitatea. Odată autentificați, studenții sunt redirecționați către o interfață împărțită în patru cadrane, fiecare reprezentând un emoticon: smiley face, frowny face, surprised face, confused face. Feedback-ul este transmis prin simpla apăsare a unui buton, fiecare reacție si instanta text fiind înregistrată împreună cu un timestamp în baza de date.

Profesorii pot vizualiza feedback-ul în timp real pe o pagină dedicată, unde sunt afișate reacțiile. De asemenea, feedback-ul este salvat pentru a putea fi analizat ulterior. Pe această pagină, profesorii pot consulta și o listă cronologică a tuturor reacțiilor primite, păstrând anonimatul studenților.

Gestionarea activităților este intuitivă. Profesorii pot vizualiza lista completă a activităților create, având posibilitatea de a edita sau șterge activitățile viitoare. Studenții au acces limitat, doar la activitățile active, prin codurile primite, pentru a asigura securitatea și relevanța accesului.

Aplicația utilizează React pentru o experiență interactivă și fluidă, Node.js cu Express.js pentru gestionarea logicii backend, și JWT pentru autentificare securizată.
