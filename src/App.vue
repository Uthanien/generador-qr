<template>
  <div>
    <o-navbar style="border-bottom: 1px solid #7957d5">
      <template #start>
        <o-navbar-item><strong>Generador de códigos QR</strong></o-navbar-item>
      </template>
      <template #end>
        <o-navbar-item tag="div">
          <div class="buttons">
            <a href="https://parzibyte.me/#contacto" class="button is-danger">
              <o-icon icon="help"></o-icon>
              <strong>Ayuda y soporte</strong>
            </a>
          </div>
        </o-navbar-item>
      </template>
    </o-navbar>
    <section class="p-2">
      <div class="columns">
        <div class="column">
          <o-field
            label="Contenido"
            message="Puede ser una URL, página de Facebook, texto, etcétera"
          >
            <o-input
              @keyup="actualizarCodigoQr()"
              v-model="detallesQr.value"
              ref="textareaContenido"
              type="textarea"
            ></o-input>
          </o-field>
          <o-field grouped>
            <o-field label="Calidad">
              <o-select
                @update:modelValue="actualizarCodigoQr()"
                placeholder="Seleccione"
                v-model="detallesQr.level"
              >
                <option value="L">Baja</option>
                <option value="M">Media</option>
                <option value="Q">Alta</option>
                <option value="H">Máxima</option>
              </o-select>
            </o-field>
            <o-field
              label="Tamaño de la imagen"
              message="Aunque el tamaño no parezca cambiar, al descargar la imagen tendrá el tamaño seleccionado"
            >
              <o-slider
                v-model="detallesQr.size"
                :min="10"
                @update:modelValue="actualizarCodigoQr()"
                :max="1000"
              ></o-slider>
            </o-field>
          </o-field>
          <o-field grouped>
            <o-field label="Color del código">
              <Sketch
                @update:modelValue="onColorCambiado"
                :modelValue="colores"
              ></Sketch>
            </o-field>

            <o-field label="Color de fondo">
              <Sketch
                @update:modelValue="onColorDeFondoCambiado"
                :modelValue="coloresFondo"
              ></Sketch>
            </o-field>
            <o-field label="Opacidad del fondo">
              <o-slider
                v-model="detallesQr.backgroundAlpha"
                :min="0"
                :step="0.1"
                @update:modelValue="actualizarCodigoQr()"
                :max="1"
              ></o-slider>
            </o-field>
          </o-field>
        </div>
        <div class="column is-one-third">
          <div class="card has-text-centered">
            <header class="card-header">
              <p class="card-header-title">Previsualización</p>
            </header>
            <div class="card-content">
              <div class="content">
                <img alt="Código QR generado por la app" id="codigo" />
                <br />
                <o-button @click="descargar()" variant="success"
                  >Descargar</o-button
                >
              </div>
            </div>
          </div>
          <br />
          <div class="card has-text-centered">
            <div class="card-content"></div>
          </div>
        </div>
      </div>
      <o-notification variant="info" :closable="false">
        Con este generador de códigos QR puedes personalizar el contenido (URL,
        texto, número telefónico, enlace a página de Facebook) del código QR así
        como el tamaño, colores, calidad y transparencia
      </o-notification>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Generador de códigos QR </strong>creado con
          <o-icon icon="heart" variant="danger"></o-icon> por
          <a href="https://parzibyte.me/blog" target="_blank">Parzibyte</a> y mantenido por <a href="https://github.com/Uthanien/generador-qr.git" target="_blank">Uthanien</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
const colorPorDefecto = "#000000",
  colorDeFondoPorDefecto = "#ffffff",
  nivelCorrecionAlto = "H";
import QRious from "qrious";
import { Sketch } from '@ckpack/vue-color';

export default {
  components: {
    Sketch,
  },
  name: "App",
  data() {
    return {
      detallesQr: {
        value: "",
        foreground: colorPorDefecto,
        background: colorDeFondoPorDefecto,
        size: 200,
        level: nivelCorrecionAlto,
        backgroundAlpha: 1,
      },
      qr: null,
      colores: {
        hex: colorPorDefecto,
      },
      coloresFondo: {
        hex: colorDeFondoPorDefecto,
      },
    };
  },
  methods: {
    descargar() {
      const a = document.createElement("a");
      a.href = document.querySelector("#codigo").src;
      a.download = "Código QR.png";
      a.click();
    },
    actualizarCodigoQr() {
      this.qr.set({
        value: this.detallesQr.value,
        foreground: this.detallesQr.foreground,
        background: this.detallesQr.background,
        size: this.detallesQr.size,
        backgroundAlpha: this.detallesQr.backgroundAlpha,
        level: this.detallesQr.level,
      });
    },
    onColorCambiado(nuevoColor) {
      this.detallesQr.foreground = nuevoColor.hex;
      this.actualizarCodigoQr();
    },
    onColorDeFondoCambiado(nuevoColor) {
      this.detallesQr.background = nuevoColor.hex;
      this.actualizarCodigoQr();
    },
  },
  mounted() {
    this.qr = new QRious({
      element: document.querySelector("#codigo"),
    });
    this.actualizarCodigoQr();
    this.$refs.textareaContenido.$el.focus();
  },
};
</script>
