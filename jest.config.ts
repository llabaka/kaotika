import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  
  testMatch: ['**/*.test.ts', '**/*.test.tsx'], // Patrones para encontrar archivos de test
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }], // Configuración de ts-jest directamente aquí
  },
    globals: {
    "ts-jest": {
      transformerConfig: {
        transformIgnorePatterns: [
          "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
          "jest-runner",
        ],
      },
    },
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias para importar módulos
  },
  testEnvironment: 'jsdom', // Cambiar a 'jsdom' si trabajas con React u otras APIs del DOM
  verbose: true, // Mostrar resultados detallados
};

export default config;
