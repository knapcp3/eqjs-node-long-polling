type AttributesMap = { [attribute: string]: string };

export const createDOMElement = (
  elementName: string,
  attributesMap: AttributesMap,
  ...children: HTMLElement[]
): HTMLElement => {
  const element = document.createElement(elementName);
  Object.entries(attributesMap).forEach(([key, val]) =>
    element.setAttribute(key, val)
  );
  children.forEach((ch) => element.appendChild(ch));
  return element;
};
