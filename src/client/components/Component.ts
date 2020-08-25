class Component {
  private _dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this._dom = dom;
  }

  public get dom(): HTMLElement {
    return this._dom;
  }

  public replaceDOM(dom: HTMLElement): void {
    this._dom.innerHTML = '';
    this._dom.appendChild(dom);
  }
}

export default Component;
