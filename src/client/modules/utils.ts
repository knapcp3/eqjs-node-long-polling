type AttributesMap = { [attribute: string]: any };

export const createDomElement = (
  elementName: string,
  attributesMap: AttributesMap = {},
  ...children: (HTMLElement | string)[]
): HTMLElement => {
  const element = document.createElement(elementName);
  Object.assign(element, attributesMap);
  children.forEach((child) => {
    if (typeof child !== 'string') element.appendChild(child);
    else element.appendChild(document.createTextNode(child));
  });
  return element;
};
