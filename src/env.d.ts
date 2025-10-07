/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    lang: 'en' | 'fr';
    user?: any; // Ou vous pouvez définir un type plus spécifique pour l'utilisateur
  }
}