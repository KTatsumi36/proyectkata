  // 1. Normalización: convierte a minúsculas y elimina acentos.
  function eliminarAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // 2. Diccionario de excepciones para números (casos especiales y algunos compuestos)
  const especiales = {
    "uno": "ウノ",
    "dos": "ドス",
    "tres": "トレス",
    "cuatro": "クアトロ",
    "cinco": "シンコ",
    "seis": "セイス",
    "siete": "シエテ",
    "ocho": "オチョ",
    "nueve": "ヌエベ",
    "diez": "ディエス",
    "once": "オンセ",
    "doce": "ドセ",
    "trece": "トレセ",
    "catorce": "カトーレセ",   // se puede ajustar la adaptación
    "quince": "キンセ",
    "dieciseis": "ディエシセイス",
    "diecisiete": "ディエシシエテ",
    "dieciocho": "ディエシオチョ",
    "diecinueve": "ディエシヌエベ",
    "veinte": "ベインテ",
    "veintiuno": "ベインティウノ",
    "veintidos": "ベインティドス",
    "veintitres": "ベインティトレス",
    "veinticuatro": "ベインティクアトロ",
    "veinticinco": "ベインティシンコ",
    "veintiseis": "ベインティセイス",
    "veintisiete": "ベインティシエテ",
    "veintiocho": "ベインティオチョ",
    "veintinueve": "ベインティヌエベ",
    "treinta": "トレインタ",
    "cien": "シエン",
    "gue": "ゲ"
    // Se pueden agregar más casos conforme se amplíe el sistema.
  };

  // 3. Función de silabificación (muy simplificada).
  // Para los casos "once" y "doce" usamos la silabificación conocida.
  function silabificar(palabra) {
    if (palabra === "once") return ["on", "ce"];
    if (palabra === "doce") return ["do", "ce"];
    
    // Una heurística simple: agrega una separación después de una vocal si la siguiente
    // letra es una consonante y la letra posterior es una vocal.
    const vocales = "aeiou";
    let silabas = [];
    let silaba = "";
    for (let i = 0; i < palabra.length; i++) {
      silaba += palabra[i];
      if (vocales.includes(palabra[i]) && i+2 < palabra.length &&
          !vocales.includes(palabra[i+1]) && vocales.includes(palabra[i+2])) {
        silabas.push(silaba);
        silaba = "";
      }
    }
    if (silaba) silabas.push(silaba);
    return silabas;
  }

  // 4. Diccionario básico de mapeo por sílaba a katakana
  const mapeoSila = {
          "a": "ア", "e": "エ","i": "イ",
          "o": "オ",
          "u": "ウ",
          "ba": "バ",
          "bi": "ビ",
          "bu": "ブ",
          "be": "ベ",
          "bo": "ボ",
          "ca": "カ",
          "ci": "シ",
          "cu": "ク",
          "ce": "セ",
          "co": "コ",
          "da": "ダ",
          "di": "ディ",
          "du": "ドゥ",
          "de": "デ",
          "do": "ド",
          "fa": "ファ",
          "fi": "フィ",
          "fu": "フ",
          "fe": "フェ",
          "fo": "フォ",
          "ga": "ガ",
          "gi": "ギ",
          "gu": "グ",
          "ge": "ゲ",
          "go": "ゴ",
          "ha": "ハ",
          "hi": "ヒ",
          "hu": "フ",
          "he": "ヘ",
          "ho": "ホ",
          "ja": "ジャ",
          "ji": "ジ",
          "ju": "ジュ",
          "je": "ジェ",
          "jo": "ジョ",
          "ka": "カ",
          "ki": "キ",
          "ku": "ク",
          "ke": "ケ",
          "ko": "コ",
          "la": "ラ",
          "li": "リ",
          "lu": "ル",
          "le": "レ",
          "lo": "ロ",
          "ma": "マ",
          "mi": "ミ",
          "mu": "ム",
          "me": "メ",
          "mo": "モ",
          "ña": "ニャ",
          "ñe": "ニェ",
          "ño": "ニョ",
          "pa": "パ",
          "pi": "ピ",
          "pu": "プ",
          "pe": "ペ",
          "po": "ポ",
          "que": "ケ",
          "qui": "キ",
          "ra": "ラ",
          "ri": "リ",
          "ru": "ル",
          "re": "レ",
          "ro": "ロ",
          "sa": "サ",
          "si": "シ",
          "su": "ス",
          "se": "セ",
          "so": "ソ",
          "ta": "タ",
          "ti": "ティ",
          "tu": "トゥ",
          "te": "テ",
          "to": "ト",
          "va": "ヴァ",
          "vi": "ヴィ",
          "vu": "ヴ",
          "ve": "ヴェ",
          "vo": "ヴォ",
          "za": "ザ",
          "zi": "ジ",
          "zu": "ズ",
          "ze": "ゼ",
          "zo": "ゾ",
          "bl": "ブ",
          "br": "ブ",
          "cl": "ク",
          "cr": "ク",
          "dr": "ド",
          "fl": "フ",
          "fr": "フ",
          "gl": "グ",
          "gr": "グ",
          "pl": "プ",
          "pr": "プ",
          "tr": "ト",
          "ch": "チ",
          "ll": "リ",
          "rr": "ル",
          "cin": "シン",
          "tre": "トレ",
          "cho": "チョ",
          "nue": "ヌエ",
          "in": "イン",
          "n": "ン",
          "c": "ク",
          "l": "ル",
          "r": "ル",
          "k": "ク",
          "fl": "フロ",
          "s": "ス",
          "th": "ト",
          "x":"クス",
          "ph":"ファ",
          "z":"ス",
          "ya": "ヤ",
          "yu": "ユ",
          "yo": "ヨ",
          "wa": "ワ",
          "wi": "ウィ",
          "we": "ウェ",
          "wo": "ヲ",
          "n": "ン",
          "sha": "シャ",
          "shi": "シ",
          "shu": "シュ",
          "she": "シェ",
          "sho": "ショ",
          "cha": "チャ",
          "chi": "チ",
          "chu": "チュ",
          "che": "チェ",
          "cho": "チョ",
          "tsu": "ツ",
          "ti": "ティ",
          "tu": "トゥ",
          "di": "ディ",
          "du": "ドゥ",
          "va": "ヴァ",
          "vi": "ヴィ",
          "m": "ム",
          "ve": "ヴェ",
          "vo": "ヴォ",
          "kwa": "クァ",
          "kwi": "クィ",
          "kwe": "クェ",
          "kwo": "クォ",
          "gwa": "グァ",
          "gwi": "グィ",
          "gwe": "グェ",
          "gwo": "グォ",
          "tl": "トル"
    // Puedes agregar más combinaciones y ajustar según la fonética deseada.
  };

  // 5. Función que mapea una sílaba a katakana utilizando el diccionario.
  function mapearSilaba(silaba) {
    if (mapeoSila[silaba]) {
      return mapeoSila[silaba];
    }
    // Intentamos extraer dos caracteres consecutivos primero.
    let resultado = "";
    let i = 0;
    while (i < silaba.length) {
      if (i < silaba.length - 1 && mapeoSila[silaba.substring(i, i+2)]) {
        resultado += mapeoSila[silaba.substring(i, i+2)];
        i += 2;
      } else if (mapeoSila[silaba[i]]) {
        resultado += mapeoSila[silaba[i]];
        i++;
      } else {
        // Si no hay mapeo, se deja la letra en mayúsculas como señal de alerta.
        resultado += silaba[i].toUpperCase();
        i++;
      }
    }
    return resultado;
  }

  // 6. Función principal para convertir el texto a katakana.
  function convertirAKatakana(texto) {
    let limpio = eliminarAcentos(texto.toLowerCase().trim());
    
    // Si la palabra completa coincide con una excepción, se retorna esa conversión.
    if (especiales[limpio]) {
      return especiales[limpio];
    }

    // Para números compuestos, se separa por espacios o "y".
    let tokens = limpio.split(/\s+|y/).filter(token => token !== "");
    let resultado = "";
    tokens.forEach(token => {
      if (especiales[token]) {
        resultado += especiales[token];
      } else {
        let silabas = silabificar(token);
        silabas.forEach(silaba => {
          resultado += mapearSilaba(silaba);
        });
      }
    });
    return resultado;
  }

  // Evento del botón: procesa la entrada y muestra el resultado.
document.querySelector(".c-button").addEventListener("click", function() {
  const inputTexto = document.querySelector(".input").value; // Se cambió el ID por la nueva clase
  const convertido = convertirAKatakana(inputTexto);
  document.getElementById("resultado").textContent = convertido;
  
  // Muestra el botón de copiar solo si hay un resultado
  const copiarContainer = document.getElementById("copiarContainer");
  if (convertido.trim() !== '') {
      copiarContainer.style.display = 'block';
  } else {
      copiarContainer.style.display = 'none';
  }
});

// Evento del botón: copia el resultado al portapapeles.
document.getElementById("copiarBtn").addEventListener("click", function() {
  const resultadoTexto = document.getElementById("resultado").textContent;
  navigator.clipboard.writeText(resultadoTexto).then(() => {
      alert("Resultado copiado al portapapeles.");
  }).catch(err => {
      console.error("Error al copiar al portapapeles: ", err);
  });
});

// Evento para procesar la conversión al presionar Enter en el campo de entrada.
document.querySelector(".input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      const inputTexto = this.value; // Se usa `this.value` para tomar el texto del input
      const convertido = convertirAKatakana(inputTexto);
      document.getElementById("resultado").textContent = convertido;
      
      // Muestra el botón de copiar solo si hay un resultado
      const copiarContainer = document.getElementById("copiarContainer");
      if (convertido.trim() !== '') {
          copiarContainer.style.display = 'block';
      } else {
          copiarContainer.style.display = 'none';
      }
  }
});


document.getElementById('guardarBtn').addEventListener('click', async function () {
  const resultado = document.getElementById('resultado').innerText; // Obtén el texto del resultado
  if (!resultado.trim()) { // Verifica si el resultado está vacío
      alert('No hay contenido para guardar como PDF.');
      return;
  }

  const confirmacion = confirm('¿Deseas guardar el resultado como PDF?');
  if (confirmacion) {
      // Usa pdf-lib para generar el PDF
      const { PDFDocument, StandardFonts, rgb } = PDFLib;
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // Tamaño A4

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText("Resultado en Katakana:", {
          x: 50,
          y: 800,
          size: 16,
          font: font,
          color: rgb(0, 0, 0)
      });

      page.drawText(resultado, {
          x: 50,
          y: 770,
          size: 32,
          font: font,
          color: rgb(0, 0, 0)
      });

      const pdfBytes = await pdfDoc.save();

      // Descarga el PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resultado.pdf";
      link.click()
  }
});