import { Readable } from 'stream';

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

export const readStream = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('error', reject);
    stream.on('data', (chunk) => (data += chunk.toString()));
    stream.on('end', () => resolve(data));
  });
};
