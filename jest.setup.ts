import '@testing-library/jest-dom';

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (val: any) => {
    if (val === undefined || val === null) {
      return val;
    }
    return JSON.parse(JSON.stringify(val));
  };
}

global.window.matchMedia =
  global.window.matchMedia ||
  ((() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  })) as any);
