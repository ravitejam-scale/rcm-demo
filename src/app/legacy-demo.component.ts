import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-legacy-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #legacyRoot id="legacy-angular-root"></div>
    <div class="legacy-load-error" *ngIf="loadError">{{ loadError }}</div>
  `
})
export class LegacyDemoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('legacyRoot', { static: true }) legacyRoot!: ElementRef<HTMLDivElement>;
  loadError = '';
  private injectedScripts: HTMLScriptElement[] = [];

  async ngAfterViewInit(): Promise<void> {
    try {
      this.clearPreviouslyInjectedLegacyScripts();
      const bodyHtml = await fetch('assets/original/original-body.html').then((r) => {
        if (!r.ok) throw new Error(`Failed to load original body HTML (${r.status})`);
        return r.text();
      });
      this.legacyRoot.nativeElement.innerHTML = bodyHtml;

      const scriptFiles = [
        'chart.umd.js',
        'demo-config.js',
        'canvas-effects.js',
        'landing-and-platform.js',
        'v57-wow.js'
      ];
      for (const file of scriptFiles) {
        await this.injectScript(`assets/original/${file}`);
      }
      document.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('load'));
      if (typeof window !== 'undefined' && typeof (window as any).applyDemoConfig === 'function') {
        (window as any).applyDemoConfig();
      }
    } catch (error) {
      console.error(error);
      this.loadError = error instanceof Error ? error.message : 'Failed to load the demo.';
    }
  }

  ngOnDestroy(): void {
    this.injectedScripts.forEach((script) => script.remove());
    this.injectedScripts = [];
    this.legacyRoot.nativeElement.innerHTML = '';
  }

  private injectScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.dataset['legacyDemoScript'] = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
      this.injectedScripts.push(script);
    });
  }

  private clearPreviouslyInjectedLegacyScripts(): void {
    document.querySelectorAll('script[data-legacy-demo-script="true"]').forEach((node) => node.remove());
    document.body.className = '';
  }
}
