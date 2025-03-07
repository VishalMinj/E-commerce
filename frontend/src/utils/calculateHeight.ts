export function calculateHeight(): number|undefined{
    return document.querySelector('header')?.offsetHeight;
}