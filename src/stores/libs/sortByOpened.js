export default (storeA, storeB) => {
  if (storeA.storeIsOpen && storeB.storeIsOpen) {
    return 0;
  }

  if (storeA.storeIsOpen && !storeB.storeIsOpen) {
    return -1;
  }

  return 1;
}
