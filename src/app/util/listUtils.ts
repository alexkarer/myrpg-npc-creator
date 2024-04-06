export function removeElements<Type>(list: Type[], elementsToRemove: Type[]): void {
    elementsToRemove.forEach(e => {
        const elemToRemove = list.findIndex(l => l === e);
        list.splice(elemToRemove, 1);
    });
}