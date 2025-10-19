import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import CommonModule for interactivity
import { CommonModule } from '@angular/common';

// Import components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SheltersComponent } from './shelters/shelters.component';
import { ContactComponent } from './contact/contact.component';

// Import RouterModule for working navigation
import { RouterModule } from '@angular/router';

// Imports for animations
import { ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HomeComponent, AboutComponent, SheltersComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideIn', [
      state('hidden', style({ transform: 'translateX(50%)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('600ms ease-out'))
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'final-requirement';

  // Hamburger Menu Functionality
  menuOpen: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Back to top Functionality
  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Animations
  // CODE 1
  // constructor(private el: ElementRef) {}

  // @HostListener('window:scroll', [])
  // onScroll() {
  //   const elements = this.el.nativeElement.querySelectorAll('.content');
  //   elements.forEach((el: HTMLElement) => {
  //     const rect = el.getBoundingClientRect();
  //     if (rect.top < window.innerHeight * 0.9) {
  //       el.classList.add('visible');
  //     }
  //   });
  // }

  // CODE 2
  // constructor(private el: ElementRef) {}

  // ngOnInit() {
  //   this.animateVisibleElements(); // Trigger animation check on load
  // }

  // @HostListener('window:scroll', [])
  // onScroll() {
  //   this.animateVisibleElements(); // Reuse the logic for scrolling
  // }

  // private animateVisibleElements() {
  //   const elements = this.el.nativeElement.querySelectorAll('.content');
  //   elements.forEach((el: HTMLElement) => {
  //     const rect = el.getBoundingClientRect();
  //     if (rect.top < window.innerHeight * 0.9) {
  //       el.classList.add('visible');
  //     }
  //   });
  // }

  // CODE 3
  // constructor(private el: ElementRef) {}

  // ngAfterViewInit() {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('visible');
  //         observer.unobserve(entry.target); // Stop observing once animated
  //       }
  //     });
  //   }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  //   const elements = this.el.nativeElement.querySelectorAll('.content');
  //   elements.forEach((el: Element) => observer.observe(el));
  // }

  // CODE 4 (WORKS)
  // constructor(private el: ElementRef) {}

  // ngAfterViewInit() {
  //   setTimeout(() => { // Ensures all elements are fully rendered before observing
  //     const elements = this.el.nativeElement.querySelectorAll('.content');

  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('visible');
  //           observer.unobserve(entry.target); // Prevent re-triggering
  //         }
  //       });
  //     }, { threshold: 0.1 });

  //     elements.forEach((el: Element) => observer.observe(el));
  //   }, 100); // Small delay to ensure dynamic content is rendered
  // }

  // CODE 5
  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    this.initObserver(); // Run initially

    // Re-run observer logic on route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resetAnimations(); // Clear .visible to restart animations
        this.initObserver();
      }
    });
  }

  private initObserver() {
    const elements = this.el.nativeElement.querySelectorAll('.content');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Prevents repeat triggers
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: Element) => observer.observe(el));
  }

  private resetAnimations() {
    const elements = this.el.nativeElement.querySelectorAll('.content');
    elements.forEach((el: HTMLElement) => {
      el.classList.remove('visible'); // Remove .visible to restart animations
    });
  }
}
