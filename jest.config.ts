import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  
  testMatch: ['**/*.test.ts', '**/*.test.tsx'], // Patrones para encontrar archivos de test
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }], // Configuración de ts-jest directamente aquí
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias para importar módulos
  },
  testEnvironment: 'node', // Cambiar a 'jsdom' si trabajas con React u otras APIs del DOM
  verbose: true, // Mostrar resultados detallados
};

export default config;
