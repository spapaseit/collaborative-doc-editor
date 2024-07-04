export const randomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16); // Random color
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
    // Remove the hash symbol if present
    hex = hex.replace(/^#/, "");

    // Parse the hex string
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b}, ${alpha})`;
};

export const randomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};
