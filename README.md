🚀 GUÍA RÁPIDA: crear una web en 5–10 minutos
🧠 IDEA CLAVE

No estás “programando”.

👉 Estás rellenando una config → render → listo.

⚡ MÉTODO 1 (EL QUE DEBES USAR)
🔥 Paso 1: abre el proyecto
npm run dev

🧩 Paso 2: carga una base
Opción A (rápida)
Copia client-template.js
Opción B (mejor)
Copia un cliente ya hecho
👉 ejemplo: mvp-barber-studio.js
📥 Paso 3: importar config
Copia TODO el objeto:
export const xxx = { ... }
Ve a /customize
Pégalo en el cuadro de abajo
Click en:
👉 Importar config
✏️ Paso 4: edita lo mínimo necesario
🔥 OBLIGATORIO:
Nombre negocio
WhatsApp
Google Maps
Dirección
Imagen hero
Fotos
⚡ OPCIONAL (pero suma mucho):
Cambiar textos del hero
Ajustar servicios
Ajustar precios
Cambiar preset visual
🎯 Paso 5: revisa preview

👉 A la derecha ves la web en tiempo real

Comprueba:

nombre correcto
fotos bien
CTA funciona
📤 Paso 6: exportar

Click:
👉 Exportar config

🧠 Paso 7: pegar en producción
Abre:
src/config/site.config.js
Sustituye TODO por lo exportado
🌐 Paso 8: deploy

Tu flujo:

git add .
git commit -m "nuevo cliente"
git push

👉 Render / hosting se actualiza

💰 Paso 9: enviar al cliente

Le mandas:

👉 link de la web

⚡ RESUMEN ULTRA RÁPIDO
Importar config
Cambiar datos
Revisar
Exportar
Deploy
Enviar

⏱️ 5–10 minutos por web