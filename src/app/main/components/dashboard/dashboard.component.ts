import { Component, OnInit,Renderer2 } from '@angular/core';
import WOW from 'wow.js';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;  // Declaring jQuery

import { NgOptimizedImage } from '@angular/common';@Component({
  selector: 'app-dashboard',
  imports: [NgOptimizedImage],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private renderer: Renderer2,private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    new WOW().init();
  }


  ngAfterViewInit(): void {
    // Back to top button
    $(window).scroll(() => {
      if ($(window).scrollTop()! > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').click(() => {
      $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
      return false;
    });

    // Header fixed on scroll
    $(window).scroll(() => {
      if ($(window).scrollTop()! > 100) {
        $('#header').addClass('header-scrolled');
      } else {
        $('#header').removeClass('header-scrolled');
      }
    });

    if ($(window).scrollTop()! > 100) {
      $('#header').addClass('header-scrolled');
    }

    // Initialize Venobox
    $('.venobox').venobox({
      bgcolor: '',
      overlayColor: 'rgba(6, 12, 34, 0.85)',
      closeBackground: '',
      closeColor: '#fff'
    });

    // Smooth scroll for the menu
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function (this: HTMLAnchorElement) {
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        const target = $(this.hash);
        if (target.length) {
          const top_space = $('#header').outerHeight() || 40;
          $('html, body').animate({ scrollTop: target.offset().top - top_space }, 1500, 'easeInOutExpo');
          return false; // ✅ Ensures a return value in this path
        }
      }
    
      return true; // ✅ Added to cover all paths
    });
    
  }

  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = document.getElementById('header')?.offsetHeight || 0;
        const additionalOffset = 0; // Increase this value to stop higher
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  
        window.scrollTo({
          top: elementPosition - headerOffset - additionalOffset,
          behavior: 'smooth'
        });
      }
    }, 200);
  }
 
}
