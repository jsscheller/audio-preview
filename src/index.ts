/**
 * An app for playing audio files.
 *
 * @module
 */

import "media-chrome";

/**
 * An app for playing audio files.
 *
 * # Examples
 *
 * ```handle
 * audio-preview/AudioPreview(file = @file("sample.mp3"))
 * ```
 */
export class AudioPreview extends HTMLElement {
  public file!: Blob;
  private init?: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public async connectedCallback() {
    if (this.init) return;
    this.init = true;

    const container = document.createElement("div");
    Object.assign(container.style, {
      display: "flex",
      height: this.getAttribute("height") || "",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    });

    const controller = document.createElement("media-controller");
    controller.setAttribute("audio", "");
    container.append(controller);

    const audio = document.createElement("audio");
    audio.setAttribute("slot", "media");
    audio.src = URL.createObjectURL(this.file);
    controller.append(audio);

    const controlBar = document.createElement("media-control-bar");
    for (const control of [
      "media-play-button",
      ["media-seek-backward-button", "seekoffset=15"],
      ["media-seek-forward-button", "seekoffset=15"],
      ["media-time-display", "showduration="],
      "media-time-range",
      "media-playback-rate-button",
      "media-mute-button",
      "media-volume-range",
    ]) {
      let el;
      if (Array.isArray(control)) {
        el = document.createElement(control[0]);
        for (const attr of control.slice(1)) {
          const [name, value] = attr.split("=");
          el.setAttribute(name, value);
        }
      } else {
        el = document.createElement(control);
      }
      controlBar.append(el);
    }
    controller.append(controlBar);

    this.shadowRoot!.append(container);
  }
}
