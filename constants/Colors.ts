export const lightColors = {
    primary: '#A2AF9B',
    secondary: '#DCCFC0',
    background: '#FAF9EE',
    cardBackground: '#EEEEEE',
    text: '#2E2E2E',
    textSecondary: '#666666',
    border: '#D1D1D1',
    success: '#4CAF50',
    danger: '#F44336',
    warning: '#FF9800',
};

export const darkColors = {
    primary: '#7A8970',
    secondary: '#B8A99A',
    background: '#2D2D2D',
    cardBackground: '#3D3D3D',
    text: '#FAFAFA',
    textSecondary: '#CCCCCC',
    border: '#555555',
    success: '#4CAF50',
    danger: '#F44336',
    warning: '#FF9800',
};

export type ColorScheme = typeof lightColors | typeof darkColors;