export default function upgradeProperty<T extends object>(
  self: T,
  prop: string,
) {
  if (Object.hasOwn(self, prop) && prop in self.constructor?.prototype) {
    const value = self[prop];
    delete self[prop];
    self[prop] = value;
  }
}
