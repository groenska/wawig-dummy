import { Component } from '@angular/core';
import { LucideAngularModule, User, Building, Mail, Phone, Shield, Monitor } from 'lucide-angular';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="space-y-6 max-w-5xl mx-auto">
      <div class="bg-white p-6 rounded shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div class="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-[#004e82] border-2 border-white shadow-sm shrink-0">
          <lucide-icon [img]="UserIcon" [size]="40"></lucide-icon>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-800">Max Mustermann</h1>
          <p class="text-gray-500 font-medium">wawig-user-1</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full border border-green-200">Aktiv</span>
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200">WIBAS Intern</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section class="bg-white p-6 rounded shadow-sm border border-gray-200 h-full">
          <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <lucide-icon [img]="BuildingIcon" [size]="20" class="text-[#004e82]"></lucide-icon>
            <h2 class="text-lg font-medium text-gray-800">Dienststelle</h2>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-gray-500 uppercase font-semibold">Behörde</label>
              <p class="text-gray-900 font-medium">Landratsamt Esslingen</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 uppercase font-semibold">Abteilung</label>
              <p class="text-gray-900">Umwelt- und Arbeitsschutz</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 uppercase font-semibold">Referat</label>
              <p class="text-gray-900">Untere Wasserbehörde (UWB)</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 uppercase font-semibold">Standort</label>
              <p class="text-gray-900">Esslingen am Neckar</p>
            </div>
          </div>
        </section>

        <section class="bg-white p-6 rounded shadow-sm border border-gray-200 h-full">
          <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <lucide-icon [img]="ShieldIcon" [size]="20" class="text-[#004e82]"></lucide-icon>
            <h2 class="text-lg font-medium text-gray-800">Kontakt & Berechtigungen</h2>
          </div>
          <div class="space-y-5">
            <div class="flex items-center gap-3">
              <lucide-icon [img]="MailIcon" [size]="18" class="text-gray-400 shrink-0"></lucide-icon>
              <div>
                <label class="block text-xs text-gray-500 uppercase font-semibold">E-Mail Adresse</label>
                <a href="mailto:max.mustermann&#64;lra-es.de" class="text-[#004e82] hover:underline">max.mustermann&#64;lra-es.de</a>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <lucide-icon [img]="PhoneIcon" [size]="18" class="text-gray-400 shrink-0"></lucide-icon>
              <div>
                <label class="block text-xs text-gray-500 uppercase font-semibold">Telefon</label>
                <span class="text-gray-900">+49 711 3902-1234</span>
              </div>
            </div>
            <div class="pt-2 mt-2 border-t border-gray-100">
              <div class="flex items-start gap-3 mt-2">
                <lucide-icon [img]="MonitorIcon" [size]="18" class="text-gray-400 shrink-0 mt-0.5"></lucide-icon>
                <div>
                  <label class="block text-xs text-gray-500 uppercase font-semibold">Systemrolle</label>
                  <p class="text-gray-900 font-medium">Sachbearbeiter Trinkwasserschutz (Schreibzugriff)</p>
                  <p class="text-xs text-gray-500 mt-1">Zuletzt angemeldet: Heute, 08:15 Uhr</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
export class UserProfileComponent {
  readonly UserIcon = User;
  readonly BuildingIcon = Building;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly ShieldIcon = Shield;
  readonly MonitorIcon = Monitor;
}
