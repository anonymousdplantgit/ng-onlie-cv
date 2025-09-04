import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {
  education,
  experiences,
  languages,
  personalInfo,
  skills,
} from "../data";

export interface Experience {
  period: string;
  company: string;
  role: string;
  location: string;
  projects: string;
  roleDescription: string;
  technologies: string[];
}

export interface Education {
  period: string;
  degree: string;
  school: string;
}

@Component({
  selector: "app-cv",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <!-- Navigation Header -->
      <nav
        class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100"
      >
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-bold text-lg">SA</span>
              </div>
              <h1 class="text-xl font-bold text-gray-800">
                {{ personalInfo.name }}
              </h1>
            </div>

            <div class="hidden md:flex items-center space-x-6">
              <button
                (click)="scrollToSection('about')"
                [ngClass]="{
                  'text-teal-600 border-b-2 border-teal-600':
                    currentSection === 'about',
                  'text-gray-600 hover:text-teal-600':
                    currentSection !== 'about',
                }"
                class="pb-1 transition-all duration-300 font-medium"
              >
                {{ "nav.about" | translate }}
              </button>
              <button
                (click)="scrollToSection('experience')"
                [ngClass]="{
                  'text-teal-600 border-b-2 border-teal-600':
                    currentSection === 'experience',
                  'text-gray-600 hover:text-teal-600':
                    currentSection !== 'experience',
                }"
                class="pb-1 transition-all duration-300 font-medium"
              >
                {{ "nav.experience" | translate }}
              </button>
              <button
                (click)="scrollToSection('skills')"
                [ngClass]="{
                  'text-teal-600 border-b-2 border-teal-600':
                    currentSection === 'skills',
                  'text-gray-600 hover:text-teal-600':
                    currentSection !== 'skills',
                }"
                class="pb-1 transition-all duration-300 font-medium"
              >
                {{ "nav.skills" | translate }}
              </button>
              <button
                (click)="scrollToSection('contact')"
                [ngClass]="{
                  'text-teal-600 border-b-2 border-teal-600':
                    currentSection === 'contact',
                  'text-gray-600 hover:text-teal-600':
                    currentSection !== 'contact',
                }"
                class="pb-1 transition-all duration-300 font-medium"
              >
                {{ "nav.contact" | translate }}
              </button>
            </div>

            <div class="flex items-center space-x-3">
              <button
                (click)="switchLanguage('en')"
                class="px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-teal-100"
              >
                EN
              </button>
              <button
                (click)="switchLanguage('fr')"
                class="px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-teal-100"
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section id="about" class="pt-20 pb-16 relative overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-blue-600/10"
        ></div>
        <div class="container mx-auto px-4 relative">
          <div class="max-w-4xl mx-auto text-center">
            <div class="mb-8 animate-fadeInUp">
              <div
                class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
              >
                SA
              </div>
              <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                {{ personalInfo.name }}
              </h1>
              <p class="text-xl md:text-2xl text-teal-600 font-medium mb-6">
                {{ personalInfo.title | translate }}
              </p>
              <div
                class="flex items-center justify-center space-x-4 text-gray-600 mb-8"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>{{ personalInfo.address }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    ></path>
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    ></path>
                  </svg>
                  <span
                    >{{ getExperienceYears() }}+
                    {{ "common.years_experience" | translate }}</span
                  >
                </div>
              </div>
            </div>

            <div
              class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-teal-100 animate-fadeInUp"
              style="animation-delay: 0.2s;"
            >
              <p class="text-lg text-gray-700 leading-relaxed">
                {{ personalInfo.summary | translate }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section id="experience" class="py-16 bg-white/50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {{ "sections.experience" | translate }}
            </h2>
            <div
              class="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto rounded-full"
            ></div>
          </div>

          <div class="max-w-6xl mx-auto">
            <div class="relative">
              <!-- Timeline line -->
              <div
                class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-teal-600"
              ></div>

              @for (exp of experiences; track exp.company + exp.period) {
                <div class="relative mb-12 ml-20 group">
                  <!-- Timeline dot -->
                  <div
                    class="absolute -left-12 top-6 w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300"
                  ></div>

                  <div
                    class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-500 transform hover:-translate-y-1"
                  >
                    <div
                      class="flex flex-col md:flex-row md:items-start md:justify-between mb-4"
                    >
                      <div class="mb-2 md:mb-0">
                        <h3 class="text-xl font-bold text-gray-800 mb-1">
                          {{ exp.role | translate }}
                        </h3>
                        <p class="text-teal-600 font-semibold text-lg">
                          {{ exp.company }}
                        </p>
                        <p class="text-gray-500">{{ exp.location }}</p>
                      </div>
                      <div
                        class="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {{ formatPeriod(exp.period) }}
                      </div>
                    </div>

                    <div class="mb-4">
                      <h4 class="font-semibold text-gray-700 mb-2">
                        {{ "common.projects" | translate }}:
                      </h4>
                      <p class="text-gray-600">
                        {{ exp.projects | translate }}
                      </p>
                    </div>

                    <div class="mb-6">
                      <h4 class="font-semibold text-gray-700 mb-2">
                        {{ "common.role_description" | translate }}:
                      </h4>
                      <p class="text-gray-600">
                        {{ exp.roleDescription | translate }}
                      </p>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-700 mb-3">
                        {{ "common.technologies" | translate }}:
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        @for (tech of exp.technologies; track tech) {
                          <span
                            [ngClass]="getTechnologyColor(tech)"
                            class="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-default"
                          >
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section
        id="skills"
        class="py-16 bg-gradient-to-br from-teal-50 to-blue-50"
      >
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {{ "sections.skills" | translate }}
            </h2>
            <div
              class="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto rounded-full"
            ></div>
          </div>

          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <!-- Technical Skills -->
              <div
                class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div class="text-center mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">
                    {{ "skills.technical" | translate }}
                  </h3>
                </div>
                <div class="space-y-3">
                  @for (skill of skills.technical; track skill) {
                    <div
                      class="bg-teal-50 text-teal-700 px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-teal-100 transition-colors duration-300"
                    >
                      {{ skill }}
                    </div>
                  }
                </div>
              </div>

              <!-- Methodologies -->
              <div
                class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div class="text-center mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">
                    {{ "skills.methodologies" | translate }}
                  </h3>
                </div>
                <div class="space-y-3">
                  @for (method of skills.methodologies; track method) {
                    <div
                      class="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-blue-100 transition-colors duration-300"
                    >
                      {{ method }}
                    </div>
                  }
                </div>
              </div>

              <!-- Tools -->
              <div
                class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div class="text-center mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">
                    {{ "skills.tools" | translate }}
                  </h3>
                </div>
                <div class="space-y-3">
                  @for (tool of skills.tools; track tool) {
                    <div
                      class="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-purple-100 transition-colors duration-300"
                    >
                      {{ tool }}
                    </div>
                  }
                </div>
              </div>

              <!-- Languages -->
              <div
                class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div class="text-center mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">
                    {{ "skills.languages" | translate }}
                  </h3>
                </div>
                <div class="space-y-3">
                  @for (lang of languages; track lang.name) {
                    <div
                      class="flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors duration-300"
                    >
                      <span class="text-green-700 text-sm font-medium">{{
                        lang.name | translate
                      }}</span>
                      <span class="text-green-600 text-xs">{{
                        lang.level | translate
                      }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Education -->
            <div class="mt-12 max-w-2xl mx-auto">
              <div
                class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
              >
                <div class="text-center mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.88a1 1 0 00.22.624l6 8a1 1 0 001.56 0l6-8A1 1 0 0019 15V10.12l1.69-.723a1 1 0 000-1.838l-7-3z"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">
                    {{ "sections.education" | translate }}
                  </h3>
                </div>
                @for (edu of education; track edu.school) {
                  <div class="text-center">
                    <h4 class="text-xl font-semibold text-gray-800 mb-2">
                      {{ edu.degree | translate }}
                    </h4>
                    <p class="text-teal-600 font-medium text-lg mb-1">
                      {{ edu.school }}
                    </p>
                    <p class="text-gray-500">{{ edu.period }}</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {{ "sections.contact" | translate }}
            </h2>
            <div
              class="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto rounded-full"
            ></div>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Phone -->
              <div
                class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  {{ "contact.phone" | translate }}
                </h3>
                <p class="text-gray-600">{{ personalInfo.phone }}</p>
              </div>

              <!-- Email -->
              <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    ></path>
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  {{ "contact.email" | translate }}
                </h3>
                <p class="text-gray-600 break-all">{{ personalInfo.email }}</p>
              </div>

              <!-- Location -->
              <div
                class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  {{ "contact.location" | translate }}
                </h3>
                <p class="text-gray-600">{{ personalInfo.address }}</p>
              </div>
            </div>

            <!-- CTA Section -->
            <div class="mt-12 text-center">
              <div
                class="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white"
              >
                <h3 class="text-2xl font-bold mb-4">
                  {{ "contact.cta_title" | translate }}
                </h3>
                <p class="text-lg mb-6 opacity-90">
                  {{ "contact.cta_description" | translate }}
                </p>
                <a
                  href="mailto:{{ personalInfo.email }}"
                  class="inline-flex items-center px-8 py-3 bg-white text-teal-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    ></path>
                    <path
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    ></path>
                  </svg>
                  {{ "contact.get_in_touch" | translate }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-4 text-center">
          <div class="flex items-center justify-center space-x-3 mb-4">
            <div
              class="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">SA</span>
            </div>
            <span class="text-lg font-semibold">{{ personalInfo.name }}</span>
          </div>
          <p class="text-gray-400">
            © {{ "footer.copyright" | translate }} {{ personalInfo.name }}.
            {{ "footer.rights_reserved" | translate }}.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fadeInUp {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      html {
        scroll-behavior: smooth;
      }
    `,
  ],
})
export class CvComponent implements OnInit {
  private translateService = inject(TranslateService);

  currentSection = "about";
  isAnimating = false;

  personalInfo = personalInfo;

  experiences: Experience[] = experiences;

  education: Education[] = education;

  skills = skills;

  languages = languages;

  ngOnInit(): void {
    // Initialize with default language or detect browser language
    this.translateService.setDefaultLang("en");
    this.translateService.use("fr");
  }

  switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  scrollToSection(sectionId: string): void {
    this.currentSection = sectionId;
    this.isAnimating = true;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }

  getTechnologyColor(tech: string): string {
    const colors = [
      "bg-teal-100 text-teal-800",
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-yellow-100 text-yellow-800",
      "bg-red-100 text-red-800",
    ];

    const index = tech.length % colors.length;
    return colors[index];
  }

  formatPeriod(period: string): string {
    return period.replace("-", " - ");
  }

  getExperienceYears(): number {
    const startYear = 2015;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }
}
