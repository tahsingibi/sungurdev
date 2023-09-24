export default async function copyClipboard(val: any) {
    await navigator?.clipboard?.writeText(val);
}