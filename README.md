# 🎸 guitar-tab-to-piano

Convierte tablaturas de guitarra en una representación alineada de notas de piano. Perfecto para transcribir arreglos o visualizar armonías desde el punto de vista pianístico.

---

## 🚀 Instalación

```bash
npm install guitar-tab-to-piano
```

---

## 🧠 ¿Qué hace?

- Lee una tablatura de guitarra (6 cuerdas).
- Convierte cada traste a su nota correspondiente (`A`–`G#`).
- Agrupa notas por tiempo (o columnas).
- Separa las notas agudas (`e`, `B`, `G`) de las graves (`D`, `A`, `E`).
- Muestra acordes (3 o más notas simultáneas) entre paréntesis.

---

## 🛠 Uso

```ts
import { convertTabToNotes } from 'guitar-tab-to-piano';

const tab = `
e|--0--2--2---------0
B|--1--2--3--1-3-----
G|--0--3--2----------
D|--2--4-------------
A|--3--4-------------
E|--0--2------------0
`;

const result = convertTabToNotes(tab);

console.log("🎼 Tablatura original:");
console.log(result.original);
console.log("🎹 Mano derecha:");
console.log(result.upper);
console.log("🎹 Mano izquierda:");
console.log(result.lower);
```

---

## 🧪 Ejemplo de salida

```
🎼 Tablatura original:
e|--0--2--2---------0
B|--1--2--3--1-3-----
G|--0--3--2----------
D|--2--4-------------
A|--3--4-------------
E|--0--2------------0

🎹 Mano derecha:
 (E-C-G)-(F#-D#-A#)-(F#-F-A)-(D#)        (E)     
🎹 Mano izquierda:
 (E-A-C)  (F#-A#-C#)   (F#-B-D)
```

---

## 📚 API

### `convertTabToNotes(tabText: string): { original, upper, lower }`

| Propiedad | Tipo     | Descripción                                     |
|-----------|----------|-------------------------------------------------|
| `original` | string   | La tablatura original sin procesar             |
| `upper`    | string   | Notas de las cuerdas e, B, G (mano derecha)    |
| `lower`    | string   | Notas de las cuerdas D, A, E (mano izquierda)  |

---

## 📦 Build minificado

También puedes generar una versión minificada de la librería con:

```bash
npm run build:min
```

Esto crea un archivo optimizado en:

```
dist/guitar-tab-to-piano.min.js
```

Ideal para usar directamente en navegadores o distribuir como módulo ligero.

---

## 💖 Donaciones

¿Te fue útil esta herramienta? Puedes invitarme un café:

[☕ Invítame un café](https://coff.ee/zcastle)

---

## 🧑‍💻 Autor

Hecho por [@zcastle](https://github.com/zcastle) con ❤️ y algo de café.

---

## 🪪 Licencia

MIT
